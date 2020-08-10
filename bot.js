var args = process.argv;
var http = require('@thecoder08/http');
http.request({
  hostname: args[3],
  port: args[4],
  path: '/join?name=' + encodeURI(args[5]),
  method: 'GET'
}, function(data) {});
setInterval(function() {
  var movement = Math.floor(Math.random() * 5);
  if (movement == 0) {
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/up?name=' + args[5],
      method: 'GET'
    }, function(data) {});
  }
  if (movement == 1) {
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/down?name=' + args[5],
      method: 'GET'
    }, function(data) {});
  }
  if (movement == 2) {
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/left?name=' + args[5],
      method: 'GET'
    }, function(data) {});
  }
  if (movement == 3) {
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/right?name=' + args[5],
      method: 'GET'
    }, function(data) {});
  }
  if (movement == 4) {
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/get',
      method: 'GET'
    }, function(data) {
      var serverdata = JSON.parse(data);
      http.request({
        hostname: args[3],
        port: args[4],
        path: '/shoot?name=' + encodeURI(args[5]) + '&x=' + serverdata[args[6]].x + '&y=' + serverdata[args[6]].y,
        method: 'GET'
      }, function(data) {});
    });
  }
}, 1000);
