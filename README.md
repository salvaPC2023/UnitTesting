#### Para instalar las dependencias:

npm install

#### Comandos de uso:

Instalar con npm globalmante
npm install --global mocha chai c8

o como dependencia para el desarrollo del proyecto
npm install --save-dev-mocha chai c8

Ejecutar web-sever local parcel:
npm start

Ejecución de pruebas unitarias
npm test

Generación de informe de cobertura
npm run coverage

Generación de informe HTML de pruebas
npm run test-html

Configuración del Proyecto
{
  "name": "parcel-jest-base",
  "version": "1.0.0",
  "description": "",
  "default": "index.html",
  "type": "module",
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html",
    "cypress": "cypress open",
    "cypress-run": "cypress run",
    "test": "mocha test/**/*.js",
    "test-html": "mocha test/**/*.js --reporter mochawesome",
    "coverage": "c8 mocha test/**/*.js"
  },
  "c8": {
    "include": [
      "src/**/*.js"
    ],
    "exclude": [
      "test/**",
      "src/SCRIPTS/**"
    ],
    "reporter": [
      "html",
      "text"
    ],
    "check-coverage": false,
    "all": true
  }
}