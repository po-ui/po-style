const fs = require('fs');
const path = require('path');

const targetIcon = `${__dirname}/../src/assets/icons/animalia-icon`;
const targetStyle = `${__dirname}/../src/css/commons/po-icon`;

// Lista dos arquivos que devem ser manipulados
const files = [
  {
    path: `${__dirname}/../node_modules/@animaliads/animalia-icon/src/fill/Animalia-Fill.ttf`,
    name: `Animalia-Fill.ttf`,
    type: 'fonte'
  },
  {
    path: `${__dirname}/../node_modules/@animaliads/animalia-icon/src/fill/Animalia-Fill.woff`,
    name: `Animalia-Fill.woff`,
    type: 'fonte'
  },
  {
    path: `${__dirname}/../node_modules/@animaliads/animalia-icon/src/fill/style.css`,
    name: `animalia-fill.css`,
    type: 'style'
  },
  {
    path: `${__dirname}/../node_modules/@animaliads/animalia-icon/src/regular/Animalia.ttf`,
    name: `Animalia.ttf`,
    type: 'fonte'
  },
  {
    path: `${__dirname}/../node_modules/@animaliads/animalia-icon/src/regular/Animalia.woff`,
    name: `Animalia.woff`,
    type: 'fonte'
  },
  {
    path: `${__dirname}/../node_modules/@animaliads/animalia-icon/src/regular/style.css`,
    name: `animalia-regular.css`,
    type: 'style'
  }
];

// Função para copiar os arquivos
const copyFile = (source, target) => {
  let sourcePath = path.resolve(source);
  let targetPath = path.resolve(target);
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`Copied ${source} to ${target}`);
};

//#region Copia das Fontes

if (!fs.existsSync(targetIcon)) {
  fs.mkdirSync(targetIcon);
}

const fonts = files.filter(x => x.type === 'fonte');
fonts.forEach(e => {
  copyFile(e.path, `${targetIcon}/${e.name}`);
});

//#endregion

//#region Copia e Manipulação dos Style's

const removerImportSVG = cssString => {
  let value = cssString;
  const replace = [
    { pattern: /url\("\.\/Animalia-Fill\.svg#Animalia"\) format\("svg"\);/g, replacement: '' },
    {
      pattern: /url\("\.\/Animalia-Fill\.ttf"\) format\("truetype"\),/g,
      replacement: 'url("./../icons/animalia-icon/Animalia-Fill.ttf") format("truetype"),'
    },
    {
      pattern: /url\("\.\/Animalia-Fill\.woff"\) format\("woff"\),/g,
      replacement: 'url("./../icons/animalia-icon/Animalia-Fill.woff") format("woff");'
    },
    { pattern: /url\("\.\/Animalia\.svg#Animalia"\) format\("svg"\);/g, replacement: '' },
    {
      pattern: /url\("\.\/Animalia\.ttf"\) format\("truetype"\),/g,
      replacement: 'url("./../icons/animalia-icon/Animalia.ttf") format("truetype"),'
    },
    {
      pattern: /url\("\.\/Animalia\.woff"\) format\("woff"\),/g,
      replacement: 'url("./../icons/animalia-icon/Animalia.woff") format("woff");'
    }
  ];

  replace.forEach(element => {
    value = value.replace(element.pattern, element.replacement);
  });

  return value;
};

const styles = files.filter(x => x.type === 'style');
styles.forEach(e => {
  try {
    const pathCss = `${targetStyle}/${e.name}`;
    copyFile(e.path, pathCss);

    const cssContent = removerImportSVG(fs.readFileSync(pathCss, 'utf8'));
    fs.writeFileSync(pathCss, cssContent);

    console.log(`Remoção do SVG realizada sucesso em ${e.name}`);
  } catch (error) {
    console.log('Falha na copia e manipulação dos styles');
  }
});

//#endregion

//#region Manipulação do po-icon/index.css

const cssFilePath = `${targetStyle}/index.css`;
const importLines = ["@import './animalia-regular.css';", "@import './animalia-fill.css';"];

function isImportLinePresent(cssContent, importLine) {
  // Remove espaços em branco extras e converte para minúsculo para comparar sem distinção de maiúsculas/minúsculas
  const cleanedCssContent = cssContent.toLowerCase().replace(/\s+/g, '');
  const cleanedImportLine = importLine.toLowerCase().replace(/\s+/g, '');
  return cleanedCssContent.includes(cleanedImportLine);
}

const addImportLines = (cssFilePath, importLines) => {
  if (fs.existsSync(cssFilePath)) {
    let cssContent = fs.readFileSync(cssFilePath, 'utf8');
    importLines.forEach(line => {
      if (!isImportLinePresent(cssContent, line)) {
        cssContent = `${cssContent}\n${line}`;
      }
    });
    fs.writeFileSync(cssFilePath, cssContent);
    console.log(`Linhas de importação adicionadas com sucesso em ${cssFilePath}`);
  } else {
    console.log(`Arquivo ${cssFilePath} não encontrado.`);
  }
};

addImportLines(cssFilePath, importLines);

//#endregion
