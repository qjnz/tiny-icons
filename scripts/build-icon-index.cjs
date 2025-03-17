// scripts/build-icon-index.js
const fs = require('fs');
const path = require('path');

const iconDir = path.resolve(__dirname, '../src/icons');
const indexFile = path.resolve(iconDir, 'index.js');

// Read all SVG files in the icons directory
const icons = fs.readdirSync(iconDir)
  .filter(file => file.endsWith('.svg'))
  .map(file => path.basename(file, '.svg'));

// Generate re-export statements for each icon
const indexContent = icons.map(name => 
  `export { default as ${name} } from './${name}.svg';`
).join('\n');

fs.writeFileSync(indexFile, indexContent);
console.log(`Generated icon index with ${icons.length} icons`);
