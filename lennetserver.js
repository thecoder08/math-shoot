var lennet = require('@thecoder08/lennet');
lennet.setServerInstance(function(id) {
var fs = require('fs');
var people = {};
console.log('Server instance ' + id + ' running.');
lennet.registerRequestHandler(id, function(req, res) {
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
  else if (req.pathname == '/motd') {xt/plain', JSON.stringify(people));
  }
    res(200, 'text/plain', process.argv[3]);
  }
  else if (req.pathname == '/icon') {
    fs.readFile(process.argv[4], function(err, data) {
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
});
lennet.init(process.argv[2]);
