var archive = require('../helpers/archive-helpers');
archive.makeJobQueue(function(queue) {
  archive.downloadUrls(queue);
});

