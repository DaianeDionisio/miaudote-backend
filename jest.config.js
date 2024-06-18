/** @type {import('jest').Config} */
const config = {
  verbose: true,
  reporters:  [
      'default',
      ['./node_modules/jest-html-reporters', {
        pageTitle: 'Relatório de Testes',
        outputPath: 'relatorio_de_testes.html',
      }],
    ],
    collectCoverage: true,
};

module.exports = config;