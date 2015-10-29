var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
var respond = require('../helpers/responder')

// require more modules/folders here!


function makeAsseturl (url) {
  return path.join(archive.paths.siteAssets, url);
}

function makeSiteurl (url) {
  return path.join(archive.paths.archivedSites, url);
}



function getFunction (req, res, route) {
    if(route == ''){
      helpers.serveAssets(res, makeAsseturl('index.html'));
    } else {
      helpers.serveAssets(res, makeSiteurl(route));
    }
}

function postFunction (req,res,route) {
  
    var data = '';
    req.on('data', function(chunk) {
      data+=chunk;
    })
    req.on('end', function(){
      if(data.slice(0,4) === 'url='){
        var datum = data.slice(4);
        archive.isUrlArchived(datum, function (yes){
          if(yes){
            helpers.serveAssets(res, path.join(archive.paths.archivedSites, datum))
          } else {
            helpers.writeArchive(res, archive.paths.list, datum + '\n');
          }            
        });
      } else {
        respond('go away', res, 404);
      }
    })
}
exports.handleRequest = function (req, res, route) {
  var route = url.parse(req.url).path.slice(1);

  if (req.method ==='GET'){
    getFunction(req,res,route)
  } else if (req.method ==='POST'){
    postFunction(req, res, route)
  }


};
