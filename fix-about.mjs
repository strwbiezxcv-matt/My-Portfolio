import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/app/components/sections/About.tsx', 'utf8');

// 1. Replace Hero wrapper min-height and add proper structure
content = content.replace(
  '<div className="flex-1 flex items-center justify-center min-h-screen">',
  '<div className="flex-1 flex items-center justify-center min-h-screen pt-16">'
);

// 2. Fix the closing structure - close Hero, add About section
const oldEnding = `          </motion.div>
        </motion.div>
      </div>

          {/* ── About Me — futuristic developer interface ── */}
          <div className="mx-auto max-w-5xl text-left">`;

const newEnding = `          </motion.div>
        </motion.div>
      </div>

      {/* ── About Me Section (below Hero, only visible after scrolling) ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-5xl w-full text-left"
      >`;

content = content.replace(oldEnding, newEnding);

// 3. Fix the About paragraph to be exactly 2 lines (max-w-xl ensures ~2 lines)
content = content.replace(
  `<p className={\`text-lg md:text-xl leading-relaxed max-w-xl \${theme.text}\`}>
            I'm a passionate creative designer, layout artist, and web developer with 3 years of experience turning ideas into engaging digital experiences.
          </p>`,
  `<p className={\`text-lg md:text-xl leading-relaxed max-w-xl \${theme.text}\`}>
            I'm a passionate creative designer, layout artist, and web developer with 3 years of experience turning ideas into engaging digital experiences.
          </p>`
);

// 4. Replace SkillRing in tech stack with years
content = content.replace(
  `<SkillRing percent={t.percent} />
                  <t.icon size={20} className="shrink-0 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-brand" />
                  <span className="text-sm font-medium leading-tight">{t.name}</span>`,
  `<t.icon size={20} className="shrink-0 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-brand" />
                  <span className="text-sm font-medium leading-tight">{t.name}</span>
                  {t.years && <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{t.years}</span>}`
);

// 5. Replace SkillRing in tools
content = content.replace(
  `<SkillRing percent={t.percent} />
                  <t.icon size={20} className="shrink-0 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-brand" />
                  <span className="text-sm font-medium leading-tight">{t.name}</span>`,
  `<t.icon size={20} className="shrink-0 text-gray-600 dark:text-gray-300 transition-colors duration-300 group-hover:text-brand" />
                  <span className="text-sm font-medium leading-tight">{t.name}</span>
                  {t.years && <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{t.years}</span>}`
);

// 6. Fix the closing - remove extra </div> from old Hero structure
content = content.replace(
  `        </motion.div>
      </div>
      </div>`,
  `        </motion.div>
      </motion.div>
    </section>`
);

writeFileSync('src/app/components/sections/About.tsx', content);
console.log('Done');