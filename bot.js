const prefix = "+";
const cooldown = new Set();

const Discord = require("discord.js");
const Naze = new Discord.Client();

const ms = require('ms');
const swearWords = ["nigger", "nIgGer", "NIGGER", "n1gg3r", "nIGGer", "Nigger", "nigga"];

Naze.login(process.env.BOT_TOKEN);
Naze.on("ready", () => {Naze.user.setPresence({game: {name: "+help | Gabby.com", type: 2}}); });
Naze.on("ready", () => {
    console.log("On and ready");
});

//Autoresponder
Naze.on("message", (msg) => {
if (msg.author.bot) return;
if (msg.channel.type === "dm") return;

if (cooldown.has(msg.author.id)) {
    return;
  }

  cooldown.add(msg.author.id);
  setTimeout(() => {
    cooldown.delete(msg.author.id);
  }, 1500)

  //Autoresponder
    if (msg.content.toLowerCase() == "blue") {
        msg.channel.send("Is a noob, lmao.") 

//Emote Responder
    } else if  (msg.content.toLowerCase().includes('gabby')) {
        msg.react("🌹")) {
            
    //Bot Latency
} else if (msg.content.toLowerCase() == prefix+"ping") {
       msg.channel.send('Time it takes to ping this shit bot..').then(sent => {
    sent.edit(`Pong! Took ${sent.createdTimestamp - msg.createdTimestamp}ms`);
    }); 

    //Say Command
    } else if (msg.content.toLowerCase().startsWith(prefix+"say")) {
        if (msg.author.id !== "259927585922744321" && msg.author.id !== "276517986645573632"){
        return;
    }
    let args = msg.content.split(" ").splice(1);
    let sayThis = args.join(" ");
    msg.channel.send(sayThis);
    msg.delete();

    //Invite Command
    } else if (msg.content.toLowerCase() == prefix+"invite") {
        msg.channel.send("https://discordapp.com/api/oauth2/authorize?client_id=414093704865775626&permissions=0&scope=bot")
    
    //Swear Word Command
    } else if (swearWords.some(word => msg.content.includes(word)) ) {
        msg.reply(" watch your language fella!");
        msg.delete();

//Avatar Command
    }
    else if (msg.content.toLowerCase().startsWith(prefix+"avatar")) {
        let user = msg.mentions.users.first() || msg.author;
        let embed = new Discord.RichEmbed()
        .setAuthor(`${user.username}`)
        .setImage(user.displayAvatarURL)
        .setColor('RANDOM')
        msg.channel.send(embed)

//Kick Command
} else if(msg.content.toLowerCase().startsWith(prefix+ `kick`)) {
    if (!msg.member.hasPermission("KICK_MEMBERS")) {
    msg.reply(" ,you don't have the permissions to perform this task!");
    return;
    }
    if(msg.mentions.members.size <1) {
        msg.reply(", ping someone in order to kick a user, silly!");
        return;
    }
    let args = msg.content.split(" ").splice(2);
    let guild = msg.guild.name
    let reason = args.join(" ");
    let kickThisPerson = msg.mentions.members.first();
    if (reason.length <1) 
    {
        kickThisPerson.kick();
        kickThisPerson.send("You were kicked from "+guild+", "+reason+"")
        return;
    }
    msg.channel.send(kickThisPerson + ' has been kicked!');
    setTimeout(()=>{kickThisPerson.kick(reason)});

    //Ban Command
    } else if(msg.content.toLowerCase().startsWith(prefix+ `ban`)) {
        if (!msg.member.hasPermission("BAN_MEMBERS")) {
            msg.reply(", you don't have the permission to perform this task!");
            return;
        }
            if(msg.mentions.members.size <1) {
                msg.reply(", ping someone in order to ban a user, silly!");
                return;
            }
            let args = msg.content.split(" ").splice(2);
            let guild = msg.guild.name
            let reason = args.join(" ");
            let banThisPerson = msg.mentions.members.first();
            if (reason.length <1)
            {
                banThisPerson.ban();
                banThisPerson.send("You were banned from "+guild+", "+reason+"")
                return;
            }
            msg.channel.send(banThisPerson + ' has been banned!');
            setTimeout(()=>{banThisPerson.ban(reason)});
            

   //Purge Command              
} else if (msg.content.toLowerCase().startsWith(prefix+`purge`)) {
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
        msg.reply(", you don't have permissions to perform this task!"); //If someone doesn't have perms, won't delete messages and sends this reponse.
        return;
    }
    let args = msg.content.split(" ").splice(1);
    if (!args) return;
    
    let purgeThis = args.join(" ");
    if (isNaN(purgeThis)) {
        msg.reply(", enter an amount to delete."); //Has them enter a number
        return;
    }
    if (purgeThis > 500) {
        msg.channel.reply(", too many messages! Max is 100 messages.");
        return;
    }
    msg.delete();
    msg.channel.bulkDelete(purgeThis)
}

//Advertising Command
else if (msg.content.toLowerCase().includes('discord.gg/')||msg.content.toLowerCase().includes('discord.me/')||msg.content.toLowerCase().includes('discord.io/')||msg.content.toLowerCase().includes('discordapp.com/invite')){
if (!msg.member.hasPermission("MENTION_EVERYONE")) {
msg.reply(`no advertising`);
msg.delete();
}

    
//Mute Command
} else if (msg.content.toLowerCase().startsWith(prefix+'mute ')) {
 if (msg.content.toLowerCase().startsWith(prefix+`mute`)) {
 }
    let tomute = msg.mentions.members.first();
  if(!tomute) return msg.reply("couldn't find user.");
    if (!msg.member.hasPermission("MUTE_MEMBERS")) {
        msg.reply(", you don't have the permissions to perform this task!"
        );
        return;
    }
    
    let muteThisShit = msg.mentions.members.first();
    if (!muteThisShit) {
        msg.reply(", p a user to mute!");
    } else if (muteThisShit.hasPermission('MANAGE_MESSAGES')) {
        msg.reply(", can't mute this user.");
    }

    let roleForMuting = msg.guild.roles.find('name', 'Muted');
    let time2mute4 = msg.content.split(" ").splice(2);
    time2mute4 = time2mute4.join(' ');

    if (!time2mute4) {
        muteThisShit.addRole(roleForMuting.id);
        msg.channel.send('muted' + muteThisShit);
    } else {
        
        muteThisShit.addRole(roleForMuting.id)
        msg.channel.send(muteThisShit + " is now muted!");
        
        setTimeout(() => {
            muteThisShit.removeRole(roleForMuting.id);
            msg.channel.send(muteThisShit + ' has been unmuted.');
        }, ms(time2mute4));
    } 

//Server Info Command    
} else if (msg.content.toLowerCase().startsWith(prefix+"serverinfo")) {
    let sicon = msg.guild.iconURL
    let serverEmbed = new Discord.RichEmbed() 
    .setColor('RANDOM')
    .setThumbnail(sicon)
    .addField("Server name", msg.guild.name)
    .addField("Created on" , msg.guild.createdAt)
    .addField("Joined guild", msg.member.joinedAt)
    .addField("Member Count" , msg.guild.memberCount);
    msg.channel.send(serverEmbed);

//User Info Command
} else if (msg.content.toLowerCase().startsWith(prefix+"userinfo")) {
    let user = msg.mentions.users.first() || msg.author;
    
    let embed = new Discord.RichEmbed()
    .setAuthor(msg.author.tag , user.displayAvatarURL)
    .setColor('RANDOM')
    .addField('Username', user.username, true)
    .addField('ID', user.id, true)
    .addField('Created account', user.createdAt.toDateString(), true)
    .addField("Joined guild", msg.member.joinedAt, true)
    .addField('Status', user.presence.status, true)
    .setThumbnail(user.displayAvatarURL)
    msg.channel.send(embed);
    
//Member-count command
} else if (msg.content.toLowerCase().startsWith(prefix+"membercount")) {
    let mEmbed = new Discord.RichEmbed()
    .setTitle("Member Count for guild")
    .setDescription(msg.guild.memberCount)
    .setColor("RANDOM")
    msg.channel.send(mEmbed);

//8ball Command
} else if (msg.content.toLowerCase().startsWith(prefix+"8ball")) {

let replies = ["Yes", "No", "Ask again later", "It is certain.", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "Most likely", "Reply hazy try again", "Better not tell you now", "My sources say no", "Very doubtful"];
let result = replies[Math.floor(Math.random() * replies.length)];

let question = msg.content.split(' ').splice(1);
question = question.join(' ');
if (!question) return msg.reply("Please ask a full question.");

let bEmbed = new Discord.RichEmbed()
.setAuthor(msg.author.tag)
.setColor("RANDOM")
.addField("Question", question)
.addField("Answer", result);

msg.channel.send(bEmbed);

//Rate Command
} else if (msg.content.toLowerCase().startsWith(prefix+"rate")) {
     let replies = ["1", "2", "3" , "4", "5", "6", "7", "8", "9", "10"];
     let result = replies[Math.floor(Math.random() * replies.length)];

     let question = msg.content.split(' ').splice(1);
     question = question.join(' ');
     if (!question) return msg.reply("Ask a full question.");

     let rEmbed = new Discord.RichEmbed()
     .setAuthor(msg.author.tag)
     .setColor("RANDOM")
     .addField("Item to be rated:", question)
     .addField("Answer", result);
     
     msg.channel.send(rEmbed);

//Help Command
}
else if (msg.content.toLowerCase() == prefix+"help") {
    let hEmbed = new Discord.RichEmbed()
    .setAuthor("Naze ✧")
    .setTitle("Invite")
    .setURL("https://discordapp.com/api/oauth2/authorize?client_id=414093704865775626&permissions=0&scope=bot")
    .setDescription("Donate here: https://www.paypal.me/GabbyStars")
    .setColor('RANDOM')
    .addField("Mod Utilities" , "`Ban`, `Kick`, `Mute`, `Purge`", true)
    .addField("Info" , "`ServerInfo`, `Membercount`,` Avatar`, `Userinfo`", true)
    .addField("Fun Commands!", "`8ball`, `Rate`", true)
    .setTimestamp()
    .setFooter("DM Gabby#9995 for any suggestions you may have!")
    msg.channel.send(hEmbed);

//Eval Command
} else if (msg.content.toLowerCase().startsWith(prefix+"eval ")) {
    if (msg.author.id != "259927585922744321") {
      return;
    }
    try {
      let args = msg.content.split(" ").splice(1);
      let execute = args.join(" ");
      var result = eval(execute);
      msg.channel.send(result);
    } 
    catch (err){
      msg.channel.send("ERROR: "+ err);
        }
    }
 });
    Naze.on("guildMemberAdd", member => {
    const channel = member.guild.channels.find("name", "welcome");
    if(!channel) return undefined;

    let guild = member.guild.name;
    let memberAvatar = member.user.avatarURL;

    let wEmbed = new Discord.RichEmbed()
    .setTitle("New member")
    .setThumbnail(memberAvatar)
    .setColor("RANDOM")
    .addField(`** **`, `Welcome to the Server, ${member.displayName}`)
    .addField('Created account', member.user.createdAt)
    .setTimestamp()
    channel.send(wEmbed);
 });



Naze.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find('name','welcome');
    if (!channel) return;
    channel.send(`${member.displayName}, left the server. Rip`);
});
