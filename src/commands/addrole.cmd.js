const name = "addrole";
const description = "For authorized users only: add a role to a user";

const add_role = async (message, args) => {
  const user_to_add = message.mentions.members.first()
  const role_to_add = message.guild.roles.cache.find(role => role.name === args[1]);
  if (!role_to_add) {
    message.reply("you did an error in your syntax :confused:. Please use !addrole <@User> <RoleName>");
  } else {
    try {
        await user_to_add.roles.add(role_to_add);
        message.reply(`role ${args[1]} successfuly added to ${user_to_add} :ok_hand:`);
    } catch {
        message.reply("Woow... you can't do that :disappointed_relieved:");
    }
  }
};

const execute = async (message, args) => {
  if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
    if (message.channel.id === process.env.BOT_STUFF_ADMIN_CHANNEL_ID) {
        if (args.length === 2) {
          await add_role(message, args);
        } else if (args.length === 3) {
          if ((args[1] === "Jeune" && args[2] === "Bénévole") || (args[1] === "Bénévole" && args[2] === "Confirmé")) {
            args[1] = args[1] + ' ' +  args[2];
            add_role(message, args);
          } else {
            message.reply("you did an error in your syntax :confused:. Please use !addrole <@User> <RoleName>");
          }
        } else {
          message.reply("you did an error in your syntax :confused:. Please use !addrole <@User> <RoleName>");
        }
    } else {
      message.reply(
        `please send me this command in <#${process.env.BOT_STUFF_ADMIN_CHANNEL_ID}> \^\^`
      );
    }
  } else {
      message.reply("Woow... you can't do that :disappointed_relieved:");
  }
};

export { name, description, execute };