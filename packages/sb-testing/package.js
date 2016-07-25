var client = ['client'];
var server = ['server'];
var both = client.concat(server);

Package.describe({
  name: 'meteorUsername:UniqueAppAbbrevLowerCase-testing',
  version: '0.0.1',
  summary: 'Tools that help us testing the app',
  debugOnly: true
});

Package.onUse(function (api) {  
  api.use([
    'meteorUsername:UniqueAppAbbrevLowerCase' // testing package needs access to all data and methods of the full app 
    ,'velocity:html-reporter'
  ], both);

  api.addFiles([
    'namespace.js'
  ], both);

  api.addFiles([
    'fixtureMethod.js'
    , 'baseFixtures.js'
  ], server);
});

Package.onTest(function (api) {
})