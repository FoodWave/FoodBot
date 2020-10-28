import { Guild } from "discord.js";

const name = "sub";
const description = "Subscribe to our newsletter";
const execute = (message) => {
  if (message.channel.id === process.env.BOT_STUFF_PUBLIC_CHANNEL_ID) {
    if (!message.member.roles.cache.has(process.env.NEWSLETTER_ROLE_ID)) {
      message.member.roles.add(process.env.NEWSLETTER_ROLE_ID);
      message.reply(`you suscribed to our newsletter, thanks you ! :blush:`);
    } else {
        message.reply("you already suscribed to our newsletter :confused:");
    }
  } else {
    message.reply(
      `please send me your command in <#${process.env.BOT_STUFF_PUBLIC_CHANNEL_ID}> \^\^`
    );
  }
};
export { name, description, execute };
