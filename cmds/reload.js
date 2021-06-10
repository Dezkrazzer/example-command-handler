exports.run = (client, message, args) => {

    if (message.author.id !== "YOUR_ID_HERE") return message.channel.send("⛔ **ONLY MY ONWER CAN USE THIS**");

    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {

        return message.channel.send(`Unable to reload \`${args[0]}.js\``);
    }

    message.channel.send(`**Command \`${args[0]}.js\` successfully reloaded!** `);


}