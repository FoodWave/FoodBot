import dotenv from "dotenv";
import { readdirSync } from "fs";
import Discord from "discord.js";

// Getting .env config
dotenv.config();

const prefix = process.env.CMD_PREFIX;

// Starting bot client
const Bot = new Discord.Client({ autoReconnect: true });

// Find all commands files in ./src/commands (finishing with .cmd.js)
const commandFiles = readdirSync("./src/commands").filter((file) =>
  file.endsWith(".cmd.js")
);

// Creating command collection with previous collected files
Bot.commands = new Discord.Collection();
commandFiles.map(async (file) => {
  const command = await import(`./src/commands/${file}`);
  Bot.commands.set(command.name, command);
});
const commands = commandFiles.map((file) =>
  file.substring(0, file.indexOf(".cmd.js"))
);

// On bot login
Bot.on("ready", () => {
  console.log(`Logged in as ${Bot.user.tag}`);
  console.log(`Commands prefix set to '${prefix}'`);
});

// When bot detects a message
Bot.on("message", (message) => {
  // Detecting bot prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Parsing arguments from command
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLocaleLowerCase();

  // Execute typed command if exists
  if (commands?.find((cmd) => cmd === command)) {
    try {
      Bot.commands.get(command).execute(message, args);
    } catch (err) {
      message.reply("Hmmm... 🤔 Something went wrong with this command...");
    }
  } else {
    message.reply("Hmmm... 🤔 I think you typed a wrong command...");
  }
});

// Start bot
Bot.login(process.env.TOKEN);
