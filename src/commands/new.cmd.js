const name = "new";
const description =
  "For authorized users only: send a newsletter to subscribers";

const new_command = (message, args) => {
  if (args.length >= 2) {
    message.channel.send(
      `<@&${process.env.NEWSLETTER_ROLE_ID}>\n:warning: **INVENDUS DISPONIBLES** :warning:`
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
      new_command(message, args);
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
