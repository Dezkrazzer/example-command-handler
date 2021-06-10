const express = require('express');
const http = require('http');
const app = express();
// 5 Minute Ping Times
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
//^^^ UNTUK UPTIME ROBOT

const Discord = require("discord.js");
const { Client, Util } = require('discord.js');
const { prefix } = require('./config');
const client = new Discord.Client({disableEveryone: true});
const config = require("./config.json");

client.on("ready", () => {
  console.log('COMMAND HANDLER EXAMPLE SUDAH ONLINE NJENG!!!')//log untuk menandakan bot kalian sudah online:v
    setInterval(() => {
     const status = [
      `🛠️[x!]🛠️ To Help!!`,
      `🌍On🌍 ${client.guilds.size} Server`,
      `📡On📡 ${client.channels.size} Voice Channels`,
      `👥With👥 ${client.users.size} Users`
    ];
     let random = Math.floor(Math.random() * status.length)
     client.user.setPresence({ game: { name: status[random], type: "streaming", url: "https://www.twitch.tv/_kibayy"}});
  }, 5000);
})
  
client.on('message', async message => { // eslint-disable-line
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
//^^ INI UNTUK COMMAND HANDLER

client.login(process.env.BOT_TOKEN);
//^^ TARO TOKEN BOT DI `.env` (yang ada logo kunci nya)
//format nya: BOT_TOKEN=YOUR_BOT_TOKEN;