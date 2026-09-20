const fs = require('fs');
let c = fs.readFileSync('src/app/components/sections/About.tsx', 'utf8');

// 1. Remove SkillRing component definition
const srStart = c.indexOf('/* ── Small futuristic');
const srEnd = c.indexOf('/* ── Official Canva');
if (srStart !== -1 && srEnd !== -1) {
  c = c.slice(0, srStart) + c.slice(srEnd);
  console.log('Removed SkillRing component');
}

// 2. Replace SkillRing usage with years display
const oldChip = '<SkillRing percent={t.percent} />\n                  <t.icon size={20} className="shrink-0 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-brand" />\n                  <span className="text-sm font-medium leading-tight">{t.name}</span>';
const newChip = '<t.icon size={20} className="shrink-0 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-brand" />\n                  <span className="text-sm font-medium leading-tight">{t.name}</span>\n                  {t.years && <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{t.years}</span>}';
const count = c.split(oldChip).length - 1;
c = c.split(oldChip).join(newChip);
console.log('Replaced ' + count + ' SkillRing usages');

// 3. Fix closing structure
const oldClosing = '</motion.div>\n        </motion.div>\n      </div>\n      </div>\n    </section>';
const newClosing = '</motion.div>\n        </motion.div>\n      </div>\n\n      {/* ── About Me Section (below Hero, only visible after scrolling) ── */}\n      <motion.div\n        initial={{ opacity: 0, y: 40 }}\n        whileInView={{ opacity: 1, y: 0 }}\n        viewport={{ once: true }}\n        transition={{ duration: 0.6 }}\n        className="mx-auto max-w-5xl w-full text-left"\n      >';
c = c.replace(oldClosing, newClosing);
console.log('Fixed closing structure');

fs.writeFileSync('src/app/components/sections/About.tsx', c);
console.log('Done');