with open('src/app/components/ResumeEditor.tsx', 'r') as f:
    content = f.read()
content = content.replace('       </motion.div>\n     );\n   }\n }', '      </div>\n      </motion.div>\n    );\n  }\n}')
with open('src/app/components/ResumeEditor.tsx', 'w') as f:
    f.write(content)
print('Done')
