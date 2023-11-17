const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    // Builder qui va generer les information de la commande
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Reply Pong'),

    // Fonction qui va executer la commande
    async execute(interaction) {
        await interaction.reply({
            content: 'Pong!',
            ephemeral: true
        })
        setTimeout(() => {
            interaction.deleteReply()
        }, 5000)
    }
}