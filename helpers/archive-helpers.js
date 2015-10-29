var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');
// var helpers = require('./http-helpers');


/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile( exports.paths.list, 'utf-8', function (err, content){
    if (err){
      throw err;
    } else {
      var arr = content.split('\n');
      callback(arr);
    }
  })
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(arr) {
    callback(_.contains(arr, url));
  });
};

exports.addUrlToList = function(url, callback) {
  exports.readListOfUrls(function(arr) {
    arr.push();
    fs.writeFile(exports.paths.list, arr.join('\n'), function(err) {
      if (err) throw err
    });
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(path.join(exports.paths.archivedSites, url), callback);
};

exports.downloadUrls = function(urlArray) {
  _.each(urlArray,function (element){
    console.log(path.join(exports.paths.archivedSites, element))
    if(element.length){

      http.get(element, path.join(exports.paths.archivedSites, element), function(err, res){
        if(err){
          console.log(err)
        } else {
          console.log('leap of faith!')
          console.log(res.file)
        }
      });
    }
    
  });
};

exports.makeJobQueue = function(callback){
  exports.readListOfUrls(function(arr) {
    callback(_.reject(arr, function (element){
      return exports.isUrlArchived(element);
    })); 
  });
};
