#!/usr/bin/env node
if (process.argv[2] == 'server') {
  require('./server.js');
}
else if (process.argv[2] == 'bot') {
  require('./bot.js');
}
else {
  console.log('Usage:');
  console.log('mathshoot server [port] [motd] [icon]: start server build on port [port] with message of the day [motd] and icon file [icon]');
  console.log('mathshoot client: start client build');
  console.log('mathshoot bot [address] [port] [name] [target]: start bot at address [address] on port [port] with name [name] targeting [target]');
}
