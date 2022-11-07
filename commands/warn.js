const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('warn')
                .setDescription('Command pour mettre un avertissement sur un membre du serveur.'),

    async execute(interaction) {
        await interaction.reply('en developpement');
    }
}