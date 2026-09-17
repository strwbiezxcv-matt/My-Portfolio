import re

with open('src/app/components/ResumeEditor.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the JSX return block (from "return (" to ");" or "}")
return_match = re.search(r'return\s*\(\s*', content)
if not return_match:
    print("Could not find return statement")
    exit(1)

start = return_match.end()
# Find the matching close paren
depth = 1
i = start
in_string = False
string_char = None
while i < len(content) and depth > 0:
    c = content[i]
    if in_string:
        if c == '\\':
            i += 2
            continue
        if c == string_char:
            in_string = False
    else:
        if c in ('"', "'", '`'):
            in_string = True
            string_char = c
        elif c == '<' and content[i+1:i+2].isalnum() or content[i+1:i+2] == '/':
            # Possible JSX
            pass
        elif c == '(':
            depth += 1
        elif c == ')':
            depth -= 1
            if depth == 0:
                break
    i += 1

jsx_block = content[start:i]

# Now parse JSX tags in this block
# Track only actual JSX elements (skip TypeScript generics)
stack = []
errors = []

# Find all tags
for m in re.finditer(r'<(/?)(\w[\w0-9-_]*)((?:\s[^>]*?)?)(/?)>', jsx_block):
    is_closing = m.group(1) == '/'
    tagname = m.group(2)
    self_close = m.group(3).rstrip().endswith('/') or m.group(4) == '/'
    
    # Skip void/self-closing elements
    if tagname in ['br', 'hr', 'img', 'input', 'option', 'meta', 'link', 'source']:
        continue
    if self_close:
        continue
    
    if is_closing:
        if not stack:
            errors.append(f'Unexpected closing </{tagname}> - stack empty')
        elif stack[-1][0] != tagname:
            errors.append(f'MISMATCH: </{tagname}> closes, but expected </{stack[-1][0]}> (opened at offset {stack[-1][1]})')
            # Try to find matching open
            found = False
            for j in range(len(stack)-1, -1, -1):
                if stack[j][0] == tagname:
                    errors.append(f'  -> Found matching <{tagname}> at offset {stack[j][1]}')
                    found = True
                    break
            if not found:
                errors.append(f'  -> No matching <{tagname}> found in stack')
        else:
            stack.pop()
    else:
        stack.append((tagname, m.start()))

if stack:
    print(f'\nUnclosed JSX tags ({len(stack)}):')
    for tag, offset in stack:
        line_num = jsx_block[:offset].count('\n') + 1
        print(f'  <{tag}> unclosed - started at line {start_line+jsx_block[:offset].count(chr(10))+1}')
        # Find actual line in original
        actual_line = content[:start + offset].count('\n') + 1
        print(f'    (line {actual_line} in file)')

if errors:
    print('\nErrors:')
    for e in errors[:20]:
        print(f'  {e}')
