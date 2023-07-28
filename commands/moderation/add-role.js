const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-role')
        .setDescription('Ajoute un rôle')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Indiquez l\'utilisateur.')
                .setRequired(true))
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('Indiquez le rôle a donner.')
                .setRequired(true)),

    async execute(interaction) {
        if (interaction.user.username == 'mrbilal') {
            const role = interaction.options.getRole('role')
            const member = interaction.options.getMember('user')
            member.roles.add(role)
            try {
                interaction.reply({
                    content: `Le rôle ${role} a été donnée a ${member}`,
                    ephemeral: true
                })
                setTimeout(() => interaction.deleteReply(), 5000)
            } catch (err) {
                console.error;
            }
        } else {
            interaction.reply({
                content: `Commande reservée a <@653245106400264212>` ,
                ephemeral: true
            })
            setTimeout(() => interaction.deleteReply(), 5000)
        }
    }
};