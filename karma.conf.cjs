const fs = require('fs')

const rutasNavegador = [
  process.env.CHROME_BIN,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
]

const navegador = rutasNavegador.find((ruta) => ruta && fs.existsSync(ruta))
if (navegador) {
  process.env.CHROME_BIN = navegador
}

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'webpack'],
    plugins: [
      require('karma-jasmine'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-spec-reporter'),
    ],
    files: [{ pattern: 'src/tests/index.js', watched: false }],
    preprocessors: { 'src/tests/index.js': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: false,
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { chrome: '100' } }],
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
                plugins: [['istanbul', { exclude: ['src/tests/**', '**/*.spec.*'] }]],
              },
            },
          },
        ],
      },
    },
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      reporters: [{ type: 'html', subdir: 'html' }, { type: 'text-summary' }],
    },
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: false,
  })
}