const { SlashCommandBuilder } = require('discord.js');
const { QueryTypes } = require('sequelize')
const { sequelize } = require('../models/index')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('listdesc')
                .setDescription('Liste des descriptions'),

    async execute(interaction) {
        //await interaction.reply('en developpement');
        const result = await sequelize.query("SELECT * FROM descriptionrps", {type: QueryTypes.SELECT})
        var description = Array()
        description[0] = result[0].description
        var pseudo = Array()
        pseudo[0] = result[0].pseudo
        for (let i = 1; i < result.length; i++) {
            description[i] = result[i].description
            pseudo[i] = result[i].pseudo
        }
        interaction.reply('Voici la liste des descriptions !')
        for (let i = 0; i < result.length ; i++) {
                var elements = pseudo[i] + ': ' + description[i]
                await interaction.channel.send('>>> ' + elements)
        }
    }
}