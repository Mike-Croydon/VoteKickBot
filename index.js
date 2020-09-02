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
        case 'kick':
            const kickuser = message.mentions.users.first();
            // If we have a user mentioned
            if (kickuser) 
            {
              // Now we get the member from the user
              const member = message.guild.member(kickuser);
                member
                  .kick('Optional reason that will display in the audit logs')
                  .then(() => {
                    // We let the message author know we were able to kick the person
                    message.reply(`Successfully kicked ${kickuser.tag}`);
                  })
                  .catch(err => {
                    // An error happened
                    // This is generally due to the bot not being able to kick the member,
                    // either due to missing permissions or role hierarchy
                    message.reply('I was unable to kick the member');
                    // Log the error
                    console.error(err);
                  });
            } 
            // Otherwise, if no user was mentioned
            else {message.reply("You didn't mention the user to kick!");}
            break;
        case 'makeAFK':
          const AFKuser = message.mentions.users.first();
          // If we have a user mentioned
          if (AFKuser) {
            // Now we get the member from the user
            const member = message.guild.member(AFKuser);
              member.voice
                .setChannel(message.guild.afkChannel)
                .then(() => {
                  // We let the message author know we were able to kick the person
                  message.reply(`Successfully moved ${AFKuser.tag}`);
                })
                .catch(err => {
                  // An error happened
                  // This is generally due to the bot not being able to kick the member,
                  // either due to missing permissions or role hierarchy
                  message.reply('Unable to move user');
                  // Log the error
                  console.error(err);
                });
        // Otherwise, if no user was mentioned
          } else {
            message.reply("You didn't mention the user to kick!");
          } 
          break; 
          case 'votekick':
            const kickuser = message.mentions.users.first();
            //check that the user being voted on is the in the same voicechannel as the kicker
            if(message.member.voice.channel != kickuser.voice.channel)
            {
              message.channel.send("Kicker and kickee not in the same voice channel");
              break;
            }
            if(!kickuser)
            {
              message.channel.send("No kickee specified")
              break;
            }
            // If we have a user mentioned
            if (kickuser) 
            {
              // Now we get the member from the user
              const member = message.guild.member(kickuser);
                member
                  .kick('Optional reason that will display in the audit logs')
                  .then(() => {
                    // We let the message author know we were able to kick the person
                    message.reply(`Successfully kicked ${kickuser.tag}`);
                  })
                  .catch(err => {
                    // An error happened
                    // This is generally due to the bot not being able to kick the member,
                    // either due to missing permissions or role hierarchy
                    message.reply('I was unable to kick the member');
                    // Log the error
                    console.error(err);
                  });
            } 
            // Otherwise, if no user was mentioned
            else {message.reply("You didn't mention the user to kick!");}
            break;
    }
});



client.login(token);