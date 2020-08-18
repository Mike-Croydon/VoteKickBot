const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

//Token blank for commited version. Todo: add text file and read token from file, gitignore
const token = fs.readFile('token.txt');

client.on('ready',() => {
    console.log('Bot is online');
})

client.on('message', msg=> {
    if(msg.content === "HELLO")
    {
        msg.reply('Test response');
    }
})

client.login(token);