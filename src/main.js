const Discord = require('discord.js');
const dateFormat = require('dateformat');
const client = new Discord.Client();

const nbMessageSave = 100;
var tabMessages = {};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(!(msg.author in tabMessages))
        tabMessages[msg.author] = [];
    if(!msg.content.startsWith('!fbi'))
        tabMessages[msg.author].push(msg);
    if(tabMessages[msg.author].length > nbMessageSave)
        tabMessages[msg.author].shift();
    if(msg.content === '!fbi'){

        console.log(msg.mentions.users.size);

        let personne = msg.author;
        if(msg.mentions.users.size > 0)
            personne = msg.mentions.users.first();
        let messages = "";
        tabMessages[personne].forEach(function(item, index, array){
            messages += "[" + dateFormat(msg.createdAt, "HH:MM:ss") + "]\t`" + item.content + "`\n";
        });
        if(messages.length > 0)
            msg.channel.send(messages);
    }
});

//Faudra rendre le token secret
client.login('NjAyOTE5NTA5NTQzODc4NjY2.XTX3rQ.3kUdbAnIQw9GgwYtPWvBxAHV9bQ');