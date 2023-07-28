const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('purge')
                .setDescription('Effacer un ou plusieurs messages.')
                .addIntegerOption(option => 
                    option.setName('nombre')
                            .setDescription('Nombre de messages')
                            .setRequired(false)
                            .setMaxValue(100))
                .setDefaultMemberPermissions(PermissionFlagsBits.MANAGE_MESSAGES),
                
    async execute(interaction) {
        const nbrMsg = interaction.options.getInteger('nombre')
        const mrbilal = await interaction.client.users.fetch('653245106400264212')

        await interaction.channel.bulkDelete(nbrMsg).then(() => {
            if (nbrMsg != null) {
                interaction.reply(`Vous avez supprimer ${nbrMsg} messages`)
            } else {
                interaction.reply(`Vous avez supprimer 50 messages`)
            }
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
        }).catch((err) => {
            if (err.code == 50034) {
                interaction.reply({
                    content: 'Vous ne pouvez supprimer en bloc que les messages datant de moins de 14 jours.',
                    ephemeral: true
                })
            } else {
                mrbilal.send(`Error executing command '${interaction.commandName}': \`\`\`${err}\`\`\``)
                interaction.reply({
                    content: 'Il y\'a une erreur, un message a ete envoyé au developpeur avec l\'erreur',
                    ephemeral: true
                })
            }
        })
    }
};