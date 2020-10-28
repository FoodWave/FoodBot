const name = "rmrole";
const description = "For authorized users only: remove a role to a user";

const remove_role = async (message, args) => {
  const user_to_remove = message.mentions.members.first()
  const role_to_remove = message.guild.roles.cache.find(role => role.name === args[1]);
  if (user_to_remove.roles.cache.has(role_to_remove.id)) {
    if (!role_to_remove) {
        message.reply("you did an error in your syntax :confused:. Please use !rmrole <@User> <RoleName>");
    } else {
        try {
            await user_to_remove.roles.remove(role_to_remove);
            message.reply(`role "${args[1]}" successfuly removed to ${user_to_remove} :ok_hand:`);
        } catch {
            message.reply("Woow... you can't do that :disappointed_relieved:");
        }
    }
  } else {
    message.reply(`${user_to_remove} hasn't role "${args[1]}" :confused:`);
  }
};

const execute = async (message, args) => {
  if (message.member.roles.cache.has(process.env.ADMIN_ROLE_ID)) {
    if (message.channel.id === process.env.BOT_STUFF_ADMIN_CHANNEL_ID) {
        if (args.length === 2) {
          await remove_role(message, args);
        } else if (args.length === 3) {
          if ((args[1] === "Jeune" && args[2] === "Bénévole") || (args[1] === "Bénévole" && args[2] === "Confirmé")) {
            args[1] = args[1] + ' ' +  args[2];
            remove_role(message, args);
          } else {
            message.reply("you did an error in your syntax :confused:. Please use !rmrole <@User> <RoleName>");
          }
        } else {
          message.reply("you did an error in your syntax :confused:. Please use !rmrole <@User> <RoleName>");
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