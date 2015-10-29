var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var respond = require('../helpers/responder')

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, status) {
  status = status || 200;
    fs.readFile(asset, function (err, content){
      if (err){
        respond('file not found', res, 404)
      } else {
        respond(content, res, status)
      }
    })
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};





exports.writeArchive = function(res, asset, content) {
    fs.writeFile(asset, content,function (err){
      if (err){
        respond('', res, 404)
      } else {
        exports.serveAssets(res, path.join(archive.paths.siteAssets,'loading.html'), 302);
      }
    })
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
