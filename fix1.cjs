const fs = require('fs');
let c = fs.readFileSync('src/app/components/sections/About.tsx', 'utf8');

// Find where the function starts
const funcStart = c.indexOf('export default function About');
const before = c.slice(0, funcStart);

// Write the header part (imports + components + data)
fs.writeFileSync('about-part1.txt', before);
console.log('Part 1 saved, length:', before.length);
