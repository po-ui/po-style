/* ICON GENERATOR
 *
 * Para atualizar as classes dos ícones siga os seguintes passos:
 * 1: atualizar os arquivos da pasta "/src/assets/icons/" com os arquivos enviados
 *    pelo time de UX;
 * 2: rodar o comando "npm run build:icon";
 * 3: verificar se os arquivos foram atualizados:
 *   - /src/css/commons/po-icon/po-icon.css
 *   - /src/css/commons/po-icon/po-icon.html
 *   - /docs/guides/icons.md
 *
 * ATENÇÃO1: Os ícones já existentes não deverão ser alterados pelo script. Caso
 *           aconteça, valide a alteração dos hexadecimais com o time de UX.
 *
 * ATENÇÃO2: Os ícones po-icon-ok e po-icon-minus são usados pelos componentes e
 *           são referenciados pelos seus códigos hexadecimais, caso os mesmo sejam
 *           alterados devem ser atualizados também.
 *           Os mesmos são usados pelos componentes: checkbox-group, multiselect,
 *           radio-group e table.
 */

const fs = require('fs');
const parseString = require('xml2js').parseString;

const xml = fs.readFileSync(__dirname + '/src/assets/icons/PoIcon.svg');
const xmlCleanedUnicode = xml.toString().replace(/&#x/g, '').replace(/;/g, '');

let icons = [];

parseString(xmlCleanedUnicode, (err, result) => {
  const glyphs = result.svg.defs[0].font[0].glyph;

  icons = glyphs
    .map(glyph => ({ className: glyph['$']['glyph-name'], content: glyph['$'].unicode }))
    .filter(glyph => glyph.className && glyph.content)
    .sort((iconA, iconB) => {
      if (iconA.className > iconB.className) {
        return 1;
      }
      if (iconA.className < iconB.className) {
        return -1;
      }
      return 0;
    });
});

const classIcons = icons.map(
  icon =>
    `
.po-icon.po-icon-${icon.className}:before {
  content: '\\${icon.content}';
}
`
);

const sampleIcons = icons.map(
  icon => `
        <li>
          <span class="po-icon po-icon-${icon.className}"></span>
          <span>po-icon po-icon-${icon.className}</span>
        </li>
`
);

const sampleIconsHtml = `<!-- GENERATE BY ICON GENERATOR -->
<style>
  .icon-container {
    padding: 8px;
  }

  .icon-container li {
    list-style: none;
    padding: 8px;
  }

  .po-icon {
    font-size: 24px;
  }
</style>

<article>
  <section>
    <div class="icon-container">
      <ul>${sampleIcons.join('')}      </ul>
    </div>
  </section>
</article>
`;

fs.writeFileSync(__dirname + '/src/css/commons/po-icon/po-icon.css', classIcons.join('').trim() + '\n');
fs.writeFileSync(__dirname + '/src/css/commons/po-icon/po-icon.html', sampleIconsHtml);
