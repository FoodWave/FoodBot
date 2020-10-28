const name = "addrole";
const description = "For authorized users only: add a role to a user";
const execute = (message, args) => {
  if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
    if (message.channel.id === process.env.BOT_STUFF_ADMIN_CHANNEL_ID) {
      console.log("ok");
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