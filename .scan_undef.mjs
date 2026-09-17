/* Temporary diagnostic: flags identifiers that are referenced in value
   positions (JSX props / JSX tags / call sites) but never declared or
   imported anywhere in the project. Vite/esbuild does not type-check, so
   these become runtime ReferenceErrors (white screens). */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if ([".ts", ".tsx"].includes(extname(p))) out.push(p);
  }
  return out;
}

const files = walk(SRC);
const declared = new Set();
const used = new Map(); // name -> [file:line]

const GLOBALS = new Set([
  "window", "document", "console", "Math", "JSON", "Object", "Array", "String",
  "Number", "Boolean", "Date", "RegExp", "Error", "TypeError", "Promise", "Map",
  "Set", "WeakMap", "WeakSet", "ResizeObserver", "IntersectionObserver",
  "MutationObserver", "requestAnimationFrame", "cancelAnimationFrame",
  "setTimeout", "clearTimeout", "setInterval", "clearInterval", "parseInt",
  "parseFloat", "isNaN", "isFinite", "fetch", "navigator", "localStorage",
  "sessionStorage", "alert", "confirm", "prompt", "AudioContext", "Node",
  "Element", "HTMLElement", "HTMLDivElement", "HTMLSpanElement",
  "HTMLInputElement", "HTMLTextAreaElement", "HTMLSelectElement",
  "HTMLButtonElement", "HTMLAnchorElement", "HTMLImageElement", "Range", "Text",
  "KeyboardEvent", "MouseEvent", "CustomEvent", "Event", "DocumentFragment",
  "CSSStyleDeclaration", "Blob", "File", "FileReader", "FormData", "URL",
  "AbortController", "structuredClone", "queueMicrotask", "performance",
  "Symbol", "Infinity", "NaN", "undefined", "Intl", "globalThis", "crypto",
  "React", "JSX", "true", "false", "null", "this", "void", "typeof", "new",
  "ReactDOM", "Audio", "Image", "Notification", "MediaQueryList",
  "HTMLCollection", "NodeList", "DOMRect", "Selection", "ClipboardEvent",
  "EventTarget", "process", "require", "module", "exports",
]);

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = file.replace(ROOT + "\\", "").replace(/\\/g, "/");

  // Declarations: const/let/var/function/class/interface/type/enum + imports
  for (const m of text.matchAll(/\b(?:const|let|var|function|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/g))
    declared.add(m[1]);
  for (const m of text.matchAll(/import\s+([\s\S]*?)\s+from\s*["'][^"']+["']/g)) {
    const clause = m[1];
    for (const n of clause.matchAll(/([A-Za-z_$][\w$]*)\s*(?:,|$|\})/g)) declared.add(n[1]);
    for (const n of clause.matchAll(/([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)/g)) declared.add(n[2]);
  }
  // Function/arrow parameters and destructured object params
  for (const m of text.matchAll(/\(([^()]*)\)\s*(?::[^=>{]+)?=>/g))
    for (const n of m[1].matchAll(/([A-Za-z_$][\w$]*)\s*(?::|,|$)/g)) declared.add(n[1]);
  for (const m of text.matchAll(/\{([^{}]*)\}\s*(?::[^=>]+)?=>/g))
    for (const n of m[1].matchAll(/([A-Za-z_$][\w$]*)\s*(?::|,|$)/g)) declared.add(n[1]);
  for (const m of text.matchAll(/\bfunction\s+[A-Za-z_$][\w$]*\s*\(([^()]*)\)/g))
    for (const n of m[1].matchAll(/([A-Za-z_$][\w$]*)\s*(?::|,|$)/g)) declared.add(n[1]);
  for (const m of text.matchAll(/\b(?:interface|type)\s+[A-Za-z_$][\w$]*\s*(?:=|extends)?\s*\{([^}]*)\}/g))
    for (const n of m[1].matchAll(/([A-Za-z_$][\w$]*)\s*[?:]/g)) declared.add(n[1]);
  // Local destructuring consts: const { a, b } = ...
  for (const m of text.matchAll(/\b(?:const|let|var)\s*\{([^}]*)\}\s*=/g))
    for (const n of m[1].matchAll(/([A-Za-z_$][\w$]*)\s*(?::|,|$)/g)) declared.add(n[1]);
  // Object-literal keys used as shorthand props are not references; keys with
  // `key:` shape are skipped by requiring the value position below.
  for (const m of text.matchAll(/\b(?:const|let|var)\s*\[([^\]]*)\]\s*=/g))
    for (const n of m[1].matchAll(/([A-Za-z_$][\w$]*)/g)) declared.add(n[1]);

  const lines = text.split(/\r?\n/);
  const flag = (name, i) => {
    if (!used.has(name)) used.set(name, []);
    used.get(name).push(`${rel}:${i + 1}: ${lines[i].trim().slice(0, 110)}`);
  };

  lines.forEach((line, i) => {
    const code = line.replace(/\/\/.*$/, "");
    // JSX prop values: prop={identifier} / prop={identifier(...)} / prop={a.b}
    for (const m of code.matchAll(/\b[\w-]+\s*=\s*\{\s*([A-Za-z_$][\w$]*)\b(?!\s*\()/g)) flag(m[1], i);
    for (const m of code.matchAll(/\b[\w-]+\s*=\s*\{\s*([A-Za-z_$][\w$]*)\s*\(/g)) flag(m[1], i);
    // JSX tags: <Foo> / <Foo ...> / </Foo>  (uppercase only)
    for (const m of code.matchAll(/<\/?([A-Z][\w$]*)[\s/>]/g)) flag(m[1], i);
  });
}

const missing = [];
for (const [name, sites] of used) {
  if (declared.has(name) || GLOBALS.has(name)) continue;
  missing.push({ name, sites });
}

if (missing.length === 0) console.log("No undeclared identifiers found.");
for (const { name, sites } of missing.sort((a, b) => a.name.localeCompare(b.name))) {
  console.log(`\nUNDECLARED: ${name}  (${sites.length} site${sites.length > 1 ? "s" : ""})`);
  sites.slice(0, 4).forEach((s) => console.log(`   ${s}`));
}