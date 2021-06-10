exports.run = async (client, message, args, color) => {  
  if (message.channel.type == "dm") return;  
        message.channel.send(`ℹ️ | My Latency is **${client.ping.toFixed()}ms**!`)   
}