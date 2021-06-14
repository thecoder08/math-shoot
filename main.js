#!/usr/bin/env node
if (process.argv[2] == 'server') {
  require('./server.js');
}
else if (process.argv[2] == 'bot') {
  require('./bot.js');
}
else {
  console.log('Usage:');
  console.log('mathshootcli server [port] [motd] [icon]: start server build on port [port] with message of the day [motd] and icon file [icon]');
  console.log('node lennetserver.js [port] [motd] [icon]: start Lennet server build on port [port] with message of the day [motd] and icon file [icon]');
  console.log('mathshootcli bot [address] [port] [name] [target]: start bot at address [address] on port [port] with name [name] targeting [target]');
}
