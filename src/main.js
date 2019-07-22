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
    if(msg.content !== '!fbi')
        tabMessages[msg.author].push(msg);
    if(tabMessages[msg.author].length > nbMessageSave)
        tabMessages[msg.author].shift();
    if(msg.content === '!fbi'){
        let messages = "";
        let personne = msg.author;
        if(msg.isMemberMentioned())
            msg.mentions.members.first().id
        tabMessages[personne].forEach(function(item, index, array){
            messages += "[" + dateFormat(msg.createdAt, "HH:MM:ss") + "] `" + item.content + "`\n";
        });
        msg.channel.send(messages);
    }
});

//Faudra rendre le token secret
client.login('NjAyOTE5NTA5NTQzODc4NjY2.XTX3rQ.3kUdbAnIQw9GgwYtPWvBxAHV9bQ');