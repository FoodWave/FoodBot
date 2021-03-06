const name = "unsub";
const description = "Unsubscribe to our newsletter";
const execute = (message) => {
    if (message.channel.id === process.env.BOT_STUFF_PUBLIC_CHANNEL_ID) {
        if (message.member.roles.cache.has(process.env.NEWSLETTER_ROLE_ID)) {
          message.member.roles.remove(process.env.NEWSLETTER_ROLE_ID);
          message.reply(`you unsuscribed to our newsletter :sob:`);
        } else {
            message.reply("you haven't subscribed to our newsletter yet :confused:");
        }
      } else {
        message.reply(
          `please send me this command in <#${process.env.BOT_STUFF_PUBLIC_CHANNEL_ID}> \^\^`
        );
      }
};

export { name, description, execute };