var args = process.argv;
var http = require('@thecoder08/http');
console.log('Type "stop" to disconnect before exiting.');
function join() {
  http.request({
    hostname: args[3],
    port: args[4],
    path: '/join?name=' + encodeURI(args[5]),
    method: 'GET'
  }, function(data) {});
}
join();
setInterval(function() {
  var movement = Math.floor(Math.random() * 5);
  if (movement == 0) {
    console.log('Moving up...');
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/up?name=' + args[5],
      method: 'GET'
    }, function(data) {
      if (data == 'join the server to move') {
        join();
      }
    });
  }
  if (movement == 1) {
    console.log('Moving down...');
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/down?name=' + args[5],
      method: 'GET'
    }, function(data) {
      if (data == 'join the server to move') {
        join();
      }
    });
  }
  if (movement == 2) {
    console.log('Moving left...');
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/left?name=' + args[5],
      method: 'GET'
    }, function(data) {
      if (data == 'join the server to move') {
        join();
      }
    });
  }
  if (movement == 3) {
    console.log('Moving right...');
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/right?name=' + args[5],
      method: 'GET'
    }, function(data) {
      if (data == 'join the server to move') {
        join();
      }
    });
  }
  if (movement == 4) {
    console.log('Shooting at target...');
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/get',
      method: 'GET'
    }, function(data) {
      var serverdata = JSON.parse(data);
      if (serverdata.hasOwnProperty(args[6])) {
        http.request({
          hostname: args[3],
          port: args[4],
          path: '/shoot?name=' + encodeURI(args[5]) + '&x=' + serverdata[args[6]].x + '&y=' + serverdata[args[6]].y,
          method: 'GET'
        }, function(data) {
          if (data == 'join the server to shoot') {
            join();
          }
        });
      }
      else {
        console.log('Target not found.');
      }
    });
  }
}, 1000);
process.stdin.on('data', function(data) {
  if (data.toString() == ('stop' + require('os').EOL)) {
    console.log('Stopping...');
    http.request({
      hostname: args[3],
      port: args[4],
      path: '/leave?name=' + encodeURI(args[5]),
      method: 'GET',
    }, function(data) {
      process.exit();
    });
  }
  else {
    console.log('I don\'t understand.');
  }
});
