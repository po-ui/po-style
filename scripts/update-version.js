const fs = require('fs');

const packageDistPath = `${__dirname}/../package.json`;
const packageContent = fs.readFileSync(packageDistPath);
const packageJson = JSON.parse(packageContent);

if (process.argv.length != 3) {
  console.error('Expected at least one argument!');
  process.exit(1);
}

const versionBeta = process.argv[2];
packageJson.version = versionBeta;

fs.writeFileSync(packageDistPath, JSON.stringify(packageJson, null, 2));

console.log(JSON.stringify(packageJson, null, 2));
