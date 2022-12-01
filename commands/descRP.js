const { SlashCommandBuilder } = require('discord.js')
const { sequelize } = require('../models/index')
const { QueryTypes } = require('sequelize')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('descriptionrp')
                .setDescription('Indique le background de ton personnage ici')
                .addStringOption(option => 
                    option.setName('description')
                            .setDescription('Met ta description RP ici')
                            .setRequired(true)),

    async execute(interaction) {
        const description = interaction.options.getString('description');
        const pseudo = interaction.member.displayName;
        const date = `NOW()`;
        await sequelize.query(`INSERT INTO descriptionrps (description, pseudo, createdAt) VALUES ("${description}", "${pseudo}", ${date})`, {type: QueryTypes.INSERT}).then((res) => {
            console.log(res);
            interaction.reply('La description de ton personnage a bien ete faite et enregistrée !')
        }).catch((err) => {
            interaction.reply('Le caractère " n\'est pas autorisé.')
            console.log('erreur: ' + err.name);
        });
    }
}