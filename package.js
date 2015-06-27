Package.describe({
  name: 'dhruv:polymer-google-youtube',
  version: '0.0.1',
  summary: 'Adds the google-youtube (video viewer) Web Component to Meteor',
  git: 'https://github.com/dhruvrajan/meteor-polymer-google-youtube.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.use('webapp', 'server');
  api.use(['templating'], 'client');
  api.use(['underscore'], ['client', 'server']);
  api.versionsFrom('0.9.0');
  api.addFiles('polymer-google-youtube.js', 'server');
});

Npm.depends({
  bower: '1.3.12'
});