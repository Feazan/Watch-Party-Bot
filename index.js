const Discord = require("discord.js");
const axios = require("axios");
const client = new Discord.Client();
const config = require("./config.json");

const token = config.token;
const prefix = "!wp";

client.on("ready", () => {
  console.log("Bot online...");
});

client.on("message", async (msg) => {
  if (!msg.content.startsWith(prefix)) {
    return;
  }
  const bot_args = msg.content.slice(prefix.length).trim().split(/ +/g);
  console.log(bot_args);
  msg.channel.send(
    `${msg.author.username} wants to see ${bot_args[0]} at ${bot_args[1]}`
  );

  let movieData = async () => {
    let response = await axios.get(
      `http://www.omdbapi.com/?apikey=${config.omdb_key}&t=${bot_args[0]}`
    );
    return response.data;
  };
  let data = await movieData();
  console.log(data.Plot);
  msg.channel.send(`Plot: ${data.Plot}`);
});

client.login(token);
