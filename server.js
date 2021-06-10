const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const { prefix } = require('./config');
const client = new Client({
	messageCacheMaxSize: Infinity,
	messageCacheLifetime: 540,
	messageSweepInterval: 180,
	fetchAllMembers: true,
	disableMentions: 'everyone'
});
const config = require("./config.json");

client.on("ready", () => {
  console.log(`${client.user.username}#${client.user.discriminator} has been online`)
  
  setInterval(() => {
    client.user.setPresence({
            activity: { name: "I was made from github.com/Dezkrazzer/example-command-handler", type: "PLAYING" },
            status: "online"
          });;
  }, 5000);
})
  
client.on('message', async message => { 
	if (message.author.bot) return undefined;
	let prefix = config.prefix;
	if (!message.content.startsWith(prefix)) return undefined;

	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length);
	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	
	try {
		let commandFile = require(`./cmds/${cmd}.js`);
		commandFile.run(client, message, args);
	} catch (e) {
		console.log(e.message)
	} finally {
		console.log(`${message.author.username} using command ${cmd}`);
	}
})


client.login(config.token);