var config = require("./config.json"),
    Eris = require("eris"),
    bot = new Eris(`Bot ${config.token}`),
    request = require("request");

bot.on("ready", () => {
    console.log("Ready!");
});

bot.on("messageCreate", (msg) => {
    if(msg.content.indexOf(`${config.prefix}achievement`) == 0) {
      let ach_text = msg.content.split(`${config.prefix}achievement `)[1];
      var url = `https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=${config.header}&t=${ach_text}`;
      request({url: url, encoding: null}, (err, response, body) => {
        if (err) { bot.createMessage(msg.channel.id, "Error: " + err) }
        if (response.statusCode != 200) { bot.createMessage(msg.channel.id, "Got status code " + response.statusCode) }
        bot.createMessage(msg.channel.id, `Created by **${msg.author.username}**`, {
          file: response.body,
          name: 'gratz.png'
        });
      });
    }
});

bot.connect();
