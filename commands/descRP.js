const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('descriptionrp')
                .setDescription('Indique le background de ton personnage ici')
                .addStringOption(option => 
                    option.setName('description')
                            .setDescription('Met ta description RP ici')
                            .setRequired(true)),
    async execute(interaction) {
        await interaction.reply('en developpement');
    }
}