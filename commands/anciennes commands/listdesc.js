const { SlashCommandBuilder } = require('discord.js');
const { QueryTypes } = require('sequelize')
const { sequelize } = require('../../models/index')
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('listdesc')
                .setDescription('Liste des descriptions'),

    async execute(interaction) {
        //await interaction.reply('en developpement');
        await sequelize.query("SELECT * FROM descriptionrps", {type: QueryTypes.SELECT}).then((result) => {
            console.log(result);
            var description = Array()
            var pseudo = Array()

            for (let i = 0; i < result.length; i++) {
                description[i] = result[i].description
                pseudo[i] = result[i].pseudo
            }

            //interaction.reply('Voici la liste des descriptions !')
            var elements = `${pseudo[0]}` + ': ' + `${description[0]}` + '\n'
            for (let i = 1; i < result.length ; i++) {
                    elements += `${pseudo[i]}` + ': ' + `${description[i]}` + '\n'
            }

            if (pseudo[0] == undefined) {
                // inside a command, event listener, etc.
                const exampleEmbed = new EmbedBuilder()
                .setColor(0x00AF18)
                .setTitle('Aucun elements a afficher.')
                .setTimestamp()

                interaction.reply({ embeds: [exampleEmbed] });
            } else {
                // inside a command, event listener, etc.
                const exampleEmbed = new EmbedBuilder()
                .setColor(0x00AF18)
                .setTitle('Description :')
                .setDescription(`${elements}`)
                .setTimestamp()

                interaction.reply({ embeds: [exampleEmbed] });
            }
            
        }).catch((err) => {
            console.log(err);
            interaction.reply('Il y\'a une erreur')
            
        });
    }
}