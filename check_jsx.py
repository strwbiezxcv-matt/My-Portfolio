import re

with open('src/app/components/ResumeEditor.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Track opening/closing of JSX tags
stack = []
pairs = {}

for i, line in enumerate(lines, 1):
    # Find all opening tags (not self-closing) - match tag name after <
    # This regex finds <tagname ... > but not <tagname ... />
    opens = []
    for m in re.finditer(r'<([\w][\w0-9-_]*)\b([^>]*?)(/?)>', line):
        tagname = m.group(1)
        attrs = m.group(2)
        selfclose = m.group(3)
        # Skip known self-closing elements and void elements
        if selfclose == '/' or tagname in ['br', 'hr', 'img', 'input', 'meta', 'link', 'option']:
            continue
        # Check if it's a component (starts with uppercase) or HTML element
        opens.append(tagname)
    
    for tag in opens:
        stack.append((tag, i))
    
    # Find closing tags
    for m in re.finditer(r'</([\w][\w0-9-_]*)>', line):
        tag = m.group(1)
        if stack and stack[-1][0] == tag:
            pairs[stack[-1][1]] = i
            stack.pop()
        else:
            expected = stack[-1][0] if stack else 'none'
            expected_line = stack[-1][1] if stack else '?'
            print(f'MISMATCH: closing </{tag}> on line {i}, expected </{expected}> from line {expected_line}')

print(f'\nRemaining open tags (unterminated): {len(stack)}')
for tag, line_num in stack:
    print(f'  <{tag}> opened on line {line_num} - NOT CLOSED')
