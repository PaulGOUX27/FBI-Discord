const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
});

//Faudra rendre le token secret
client.login('NjAyOTE5NTA5NTQzODc4NjY2.XTX3rQ.3kUdbAnIQw9GgwYtPWvBxAHV9bQ');