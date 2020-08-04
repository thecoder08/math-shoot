#!/usr/bin/env node
if (process.argv[2] == 'server') {
  require('./server.js');
}
else if (process.argv[2] == 'client') {
  var gui = require('thecoder08-gui');
  var path = require('path');
  gui.menu([
    {
      label: 'node',
      submenu: [
        {
          label: 'Quit node',
          accelerator: 'CmdOrCtrl+Q',
          onClick: process.exit
        }
      ]
    }
  ]);
  gui.win(path.join('file://', __dirname, 'index.html'), {
    height: 1000,
    width: 1000
  });
  gui.start();
}
else {
  console.log('Usage:');
  console.log('mathshoot server [port] [motd] [icon]: start server build on port [port] with message of the day [motd] and icon file [icon]');
  console.log('mathshoot client: start client build');
}
