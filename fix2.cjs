const fs = require('fs');

let part1 = fs.readFileSync('about-part1.txt', 'utf8');

const func = `export default function About({ theme, onViewPubmats, onNavigate }: AboutProps) {
  return (
    <>
      {/* ── HERO SECTION: Full viewport, centered composition ── */}
      <section
        id="hero"
        className={\`relative flex items-center justify-center overflow-hidden \${theme.tintAlt}\`}
        style={{ minHeight: "100vh", maxHeight: "100vh" }}
      >
        {/* Ambient decorations */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-grid-fine opacity-60" />
          <div className="absolute inset-0 bg-dots-green opacity-50" />
          <span className="deco-shape size-44 rounded-full float-slow absolute" style={{ top: "8%", right: "5%" }} />
          <span className="deco-shape size-24 float-slow-rev absolute" style={{ bottom: "14%", left: "4%" }} />
          <span className="deco-plus" style={{ top: "16%", left: "8%" }} />
          <span className="deco-plus" style={{ bottom: "20%", right: "7%" }} />
          <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/50" style={{ top: "30%", right: "14%" }} />
          <span className="pulse-dot absolute size-1.5 rounded-full bg-brand/40" style={{ bottom: "26%", left: "10%", animationDelay: "1.6s" }} />
          <span className="tech-label absolute top-6 left-8 hidden md:block">// Creative Designer</span>
          <span className="tech-label absolute top-6 right-8 hidden md:block">// Computer Engineering</span>
        </div>

        <div className="relative mx-auto max-w-6xl w-full px-6 text-center corner-frame">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="section-num-rule" />
              <span className="section-num">01 · ABOUT</span>
              <span className="section-num-rule" />
            </div>

            {/* ── Intro block (Home hero content) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex justify-center order-first lg:order-none"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
                  className="will-change-transform"
                >
                  <ProfilePhoto />
                </motion.div>
              </motion.div>

              <div className="text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, ...reveal }}
                  className="mb-4"
                >
                  <span className={\`inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider \${theme.chip}\`}>
                    Computer Engineer / Graphic Artist / Layout Artist / Creatives
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, ...reveal }}
                  className="text-5xl md:text-6xl font-bold tracking-tight mb-3"
                >
                  Hi! I&apos;m Matt
                </motion.h1>`;

fs.writeFileSync('about-func1.txt', func);
console.log('Part 1 of function saved');
