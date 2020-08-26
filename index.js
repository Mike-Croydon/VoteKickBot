const Discord = require('discord.js');
const fetch = require("node-fetch");
var fs = require('fs');
//const fs = require('fs');
const client = new Discord.Client();

//Token blank for commited version. Todo: add text file and read token from file, gitignore
const token = fs.readFileSync('token/token.txt').toString();
console.log(token);

const PREFIX = '!';


var version = '1.0.1'
client.on('ready',() => {
    console.log('Bot is online');
})

client.on('message', message=> {
    let args = message.content.substr(PREFIX.length).split(" ");

    switch(args[0]){
        case 'embed':
            var purp = [255, 0, 255];
            const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .addField('Player Name', message.author.username)
            .addField('Version', version)
            .setThumbnail(message.author.avatarURL)
            .setColor(purp)
            message.channel.send(embed);
            break;
        case 'ping':
            message.channel.send('pong');
            break;
        case 'info':
            if(args[1] === 'version')
            {
                message.channel.send(version);
            }
            else
            {
                message.channel.send('Invalid args');
            }
            break;
            case 'clear':
                if(!args[1]) return message.reply('Error: please specify number of messages to delete');
                message.channel.bulkDelete(args[1]);
                break;

    }
});

client.on('message', message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
  
    // If the message content starts with "!kick"
    if (message.content.startsWith('!kick')) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
          member
            .kick('Optional reason that will display in the audit logs')
            .then(() => {
              // We let the message author know we were able to kick the person
              message.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to kick the member,
              // either due to missing permissions or role hierarchy
              message.reply('I was unable to kick the member');
              // Log the error
              console.error(err);
            });
    // Otherwise, if no user was mentioned
      } else {
        message.reply("You didn't mention the user to kick!");
      }
    }
  });



client.login(token);