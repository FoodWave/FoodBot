import Discord from "discord.js";
import loadCommands from "../core/loadCommands.js";

const name = "help";
const description =
  "Get all commands list";
const execute = async (message, args) => {
  const commands = await loadCommands();

  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#00FF00")
    .setTitle("Help")
    .setThumbnail(
      "https://secure.gravatar.com/avatar/a46e25185d3da919b650a7003804fa5a"
    )
    .setFooter("FoodBot");

  if (!args.length)
    commands.map((command) => {
      helpEmbed.addField(command.name, command.description);
    });
  else {
    const command = commands.find((cmd) => cmd.name === args[0]);
    if (!!command) {
      const { name, description } = command;
      helpEmbed.addField(name, description);
    } else {
      helpEmbed.addField(args[0], "This command doesn't exists");
    }
  }
  message.channel.send(helpEmbed);
};

export { name, description, execute };
