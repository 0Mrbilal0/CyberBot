const { SlashCommandBuilder } = require('discord.js')
const { QueryTypes } = require('sequelize')
const { sequelize } = require('../models/index')

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
        const description = interaction.options.getString('description');
        const pseudo = interaction.guild.getNickname;
        await sequelize.query(`INSERT INTO descriptionrps (description, pseudo) VALUES ('${description}','${pseudo}')`)
    }
}