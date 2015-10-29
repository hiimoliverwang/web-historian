module.exports = function (content,res,status) {
  status = status || 200;
  res.writeHead(status, {'Content-Type': 'text/html'});
  res.end(content);
}