const token  = require('./config.json');
const Discord = require('discord.js');
const dateFormat = require('dateformat');
const client = new Discord.Client();



const nbMessageSave = 100;
var tabMessages = {};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    let tabId = msg.member.id;
    if(!(tabId in tabMessages))
        tabMessages[tabId] = [];
    tabMessages[tabId].push(msg);
    if(tabMessages[tabId].length > nbMessageSave)
        tabMessages[tabId].shift();
    if(msg.content.startsWith('!fbi')){
        let personneId = tabId;
        if(msg.mentions.users.size > 0)
            personneId = msg.mentions.members.first().id;
        let messages = "";
        tabMessages[personneId].forEach(function(item, index, array){
            messages += "[" + dateFormat(msg.createdAt, "HH:MM:ss") + "]\t`" + item.content + "`\n";
        });
        if(messages.length > 0)
            msg.channel.send(messages);
    }
});

client.login(token);