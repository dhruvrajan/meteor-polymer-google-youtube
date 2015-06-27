if (process.env.NODE_ENV == 'development') {
  var bower = Npm.require("bower");
  var path = Npm.require('path');
  var bowerCommands = ["info", "install", "link", "list", "lookup", "prune",
    "register", "search", "update", "uninstall"];

  Bower = {};

// Wrap every asynchronus bower command with `Meteor._wrapAsync`
  _.forEach(bowerCommands, function (command) {
    Bower[command] = Meteor.wrapAsync(function() {
      argsArray = _.toArray(arguments);
      var callback = argsArray.pop();
      bower.commands[command]
          .apply(this, argsArray)
          .on('end', function(res) { callback(null, res); })
          .on('error', function(err) { callback(err, null); });
    });
  });

  var dir = path.join(path.relative(process.cwd(), process.env.PWD), 'public/bower_components');
  var localCache = _.values(Bower.list(null, {offline: true, directory: dir}).pkgMeta.dependencies);
  if (!_.contains(localCache, 'GoogleWebComponents/google-youtube#^1.1.0')){
    console.log('installing polymer and google-youtube' +
        ' into public directory...');
    //console.log(localCache);
    Bower.install(['GoogleWebComponents/google-youtube#^1.1.0'], {save: true}, {directory: dir});
  } else {
    console.log("google-youtube exists already. To reinitialize, remove bower_components from your public/ folder");
  }
}