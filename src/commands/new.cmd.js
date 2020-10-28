import Discord from "discord.js";

const name = "new";
const description =
  "For authorized users only: send a newsletter to subscribers";

const send_newsletter = (message, args) => {
  const newsletter_channel = message.guild.channels.cache.get(process.env.NEWSLETTER_CHANNEL_ID);
  const newsletterEmbed = new Discord.MessageEmbed()
    .setColor("#00FF00")
    .setAuthor("Newsletter")
    .setTitle(":warning: **INVENDUS DISPONIBLES** :warning:")
    .setThumbnail(
      "https://secure.gravatar.com/avatar/a46e25185d3da919b650a7003804fa5a"
    )
    .setFooter("FoodBot");

  if (args.length >= 2) {
    for (let i = 0; args[i]; i += 2) {
      newsletterEmbed.addField(args[i], args[i + 1]);
    }
    newsletter_channel.send(newsletterEmbed);
    newsletter_channel.send(
      `<@&${process.env.NEWSLETTER_ROLE_ID}>`
    );
  } else {
    message.reply(
      "you did an error in your syntax :confused:. Please use !new item1 amount1 item2 amount2 ..."
    );
  }
};

const execute = (message, args) => {
  if (
    message.member.roles.cache.has(process.env.ADMIN_ROLE_ID) ||
    message.member.roles.cache.has(process.env.MODERATOR_ROLE_ID)
  ) {
    if (message.channel.id === process.env.BOT_STUFF_ADMIN_CHANNEL_ID) {
      send_newsletter(message, args);
    } else {
      message.reply(
        `please send me this command in <#${process.env.BOT_STUFF_ADMIN_CHANNEL_ID}> \^\^`
      );
    }
  } else {
    message.reply("Woow... you can't do that :persevere: ");
  }
};

export { name, description, execute };
