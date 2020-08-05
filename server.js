var http = require('@thecoder08/http');
var prompt = require('@thecoder08/prompt');
var fs = require('fs');
var people = {};
console.log('Server running. Type "help" for help.');
http.server(process.argv[3], function(req, res, redirect) {
  if (req.pathname == '/get') {
    res(200, 'text/plain', JSON.stringify(people));
  }
  else if (req.pathname == '/join') {
    people[req.query.name] = {
      x: 100,
      y: 100,
      shotX: 1000,
      shotY: 1000,
      hp: 100
    };
    console.log(req.query.name + ' joined the game.');
    res(200, 'text/plain', 'joined successfully');
  }
  else if (req.pathname == '/shoot') {
    if (people.hasOwnProperty(req.query.name)) {
      people[req.query.name].shotX = req.query.x;
      people[req.query.name].shotY = req.query.y;
      for (var person in people) {
        if (Math.round(Math.hypot(people[person].x - people[req.query.name].shotX, people[req.query.name].shotY - people[person].y)) < 100) {
          people[person].hp -= (100 - Math.round(Math.hypot(people[person].x - people[req.query.name].shotX, people[req.query.name].shotY - people[person].y)));
        }
        if (people[person].hp < 1) {
          http.request({
            hostname: 'localhost',
            port: process.argv[3],
            path: '/leave?name=' + person,
          }, function(data) {});
          console.log(person + ' died.');
        }
      }
      res(200, 'text/plain', 'shot successfully');
      setTimeout(function() {
        if (people.hasOwnProperty(req.query.name)) {
          people[req.query.name].shotX = 1000;
          people[req.query.name].shotY = 1000;
        }
      }, 500);
    }
    else {
      res(400, 'text/plain', 'join the server to shoot');
    }
  }
  else if (req.pathname == '/up') {
    if (people.hasOwnProperty(req.query.name)) {
      people[req.query.name].y -= 20;
      res(200, 'text/plain', 'moved up successfully');
    }
    else {
      res(400, 'text/plain', 'join the server to move');
    }
  }
  else if (req.pathname == '/down') {
    if (people.hasOwnProperty(req.query.name)) {
      people[req.query.name].y += 20;
      res(200, 'text/plain', 'moved down successfully');
    }
    else {
      res(400, 'text/plain', 'join the server to move');
    }
  }
  else if (req.pathname == '/left') {
    if (people.hasOwnProperty(req.query.name)) {
      people[req.query.name].x -= 20;
      res(200, 'text/plain', 'moved left successfully');
    }
    else {
      res(400, 'text/plain', 'join the server to move');
    }
  }
  else if (req.pathname == '/right') {
    if (people.hasOwnProperty(req.query.name)) {
      people[req.query.name].x += 20;
      res(200, 'text/plain', 'moved right successfully');
    }
    else {
      res(400, 'text/plain', 'join the server to move');
    }
  }
  else if (req.pathname == '/leave') {
    delete people[req.query.name];
    console.log(req.query.name + ' left the game.');
    res(200, 'text/plain', 'left successfully');
  }
  else if (req.pathname == '/players') {
    res(200, 'text/plain', Object.keys(people).length.toString());
  }
  else if (req.pathname == '/motd') {
    res(200, 'text/plain', process.argv[4]);
  }
  else if (req.pathname == '/icon') {
    fs.readFile(process.argv[5], function(err, data) {
      if (err) {
        res(404, 'text/plain', '404 not found');
      }
      else {
        res(200, 'image/png', data);
      }
    });
  }
  else {
    res(404, 'text/plain', '404 not found');
  }
});
prompt.interface('', function(data) {
  var tokens = data.toString().split(require('os').EOL)[0].split(' ');
  if (tokens[0] == 'list') {
    for (var person in people) {
      console.log('Player ' + person + ' is at x: ' + people[person].x + ' y: ' + people[person].y + ' shotX: ' + people[person].shotX + ' shotY: ' + people[person].shotY + ' hp: ' + people[person].hp + '.');
    }
  }
  else if (tokens[0] == 'help') {
    console.log('list: List all players and their cordinates.');
    console.log('help: Display this help menu.');
    console.log('stop: Stop the server.');
    console.log('tp [player] [x] [y]: Teleport player [player] to x position [x] and y position [y].');
    console.log('kick [name]: Kick the player with name [name] from the server.');
  }
  else if (tokens[0] == 'stop') {
    console.log('Stopping the server...');
    process.exit();
  }
  else if (tokens[0] == 'kick') {
    http.request({
      hostname: 'localhost',
      port: process.argv[3],
      path: '/leave?name=' + tokens[1]
    }, function(data) {});
    console.log('Kicked ' + tokens[1] + '.');
  }
  else if (tokens[0] == 'tp') {
    people[tokens[1]].x = parseInt(tokens[2]);
    people[tokens[1]].y = parseInt(tokens[3]);
  }
  else {
    console.log(tokens[0] + ': command not found.');
  }
});
