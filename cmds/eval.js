const Discord = require("discord.js");
let thisisarray = ["YOUR ID HERE", "SECOND ID"]

exports.name = "eval";
exports.run = async (bot, message, query) => {
  


function parseQuery(queries) {
  const args = [];
  const flag = [];
  
  for (const query of queries) {
    if (query.startsWith("--"))
      flag.push(query.slice(2).toLowerCase());
    else args.push(query);
  }
  
  return { args, flag };
}
 
    
const { flag, args } = parseQuery(query);
  let msg = message;
  if (!thisisarray.includes(message.author.id)) return message.channel.send("<:Error:575148612166746112> Sorry you're not my developer")

    try {
        let codein = args.join(" ");
        let code = await eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
      
      if (code.length > 1024) {
          fetch("https://hastebin.com/documents", {
            body: code,
            method: "POST"
          }).then(response => response.json()).then(res => {
            let embed = new Discord.MessageEmbed()
        .setAuthor('Evaluation', bot.user.displayAvatarURL())
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\nhttps://hastebin.com/${res.key}\n\`\`\``)
        .setFooter(`${bot.user.username} websockets: ${bot.ws.ping}`)
        
        if (flag.includes("no-embed"))
          return message.channel.send(`\`\`\`js\nhttps://hastebin.com/${res.key}\n\`\`\``);
      
      return message.channel.send(embed);
          });
        }
        let embed = new Discord.MessageEmbed()
        .setAuthor('Evaluation', bot.user.displayAvatarURL())
        .setColor('RANDOM')
        .addField(':inbox_tray: Input', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Output', `\`\`\`js\n${code}\n\`\`\``)
        .setFooter(`${bot.user.username} websockets: ${bot.ws.ping}`)
        
        if (flag.includes("no-embed"))
          return message.channel.send(`\`\`\`js\n${code}\n\`\`\``);
      
      return message.channel.send(embed);
    } catch (e) {
      if (e.message.length > 1024) {
        fetch("https://hastebin.com/documents", {
          body: e.message,
          method: "POST"
        }).then(response => response.json()).then(resp => {
          return message.channel.send(`\`\`\`js\nhttps://hastebin.com/${resp.key}\`\`\``);
        });
      }
     return message.channel.send(`\`\`\`js\n${e}\`\`\``);
    }


}