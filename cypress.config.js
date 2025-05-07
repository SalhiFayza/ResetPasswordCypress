const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  chromeWebSecurity: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'MyStore🦩',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false,
    html: true,
    json: false
  },
  e2e: {
    setupNodeEvents(on, config) {
      screenshotOnRunFailure = true
      require('cypress-mochawesome-reporter/plugin')(on),
        on('file:preprocessor', cucumber())
    },
    baseUrl:'https://mystory-cosmetics.shop',
    specPattern: "cypress/e2e/features/**/*.feature",
    excludeSpecPattern: '**/*.{js,ts}',
  },
 env:{
  MAILOSAUR_API_KEY: "your-api-key",

 }
});
