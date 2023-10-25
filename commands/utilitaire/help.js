const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affichage des commands'),

    async execute(interaction) {
        
    }
}