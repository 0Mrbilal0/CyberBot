const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('purge')
                .setDescription('Effacer un ou plusieurs messages.')
                .addIntegerOption(option => 
                    option.setName('nombre')
                            .setDescription('Nombre de messages')
                            .setRequired(false))
                .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_MESSAGES),
                
    async execute(interaction) {
        const nbrMsg = interaction.options.getInteger('nombre')
        await interaction.channel.bulkDelete(nbrMsg).then((result) => {
            console.log(result);
            if (nbrMsg != null) {
                interaction.reply(`Vous avez supprimer ${nbrMsg} messages`)
            } else {
                interaction.reply(`Vous avez supprimer 50 messages`)
            }
            
        }).catch((err) => {
            if (err.code == 50034) {
                interaction.reply('Vous ne pouvez supprimer en bloc que les messages datant de moins de 14 jours.')
                console.log(err);
            } else {
                interaction.reply('Il y\'a une erreur, mp moi pour que je corrige ca')
            }
        });
    }
}