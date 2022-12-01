const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { sequelize } = require('../models/index')
const { QueryTypes } = require('sequelize')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('warns')
                .setDescription('Command pour afficher la list des warns.'),
                
    async execute(interaction) {
        await sequelize.query("SELECT * FROM warns", {type: QueryTypes.SELECT}).then((result) => {
            var staff = Array()
            var pseudo = Array()
            var raison = Array()
            

            for (let i = 0; i < result.length; i++) {
                staff[i] = result[i].staff
                pseudo[i] = result[i].pseudo
                raison[i] = result[i].raison
            }
            

            //interaction.reply('Voici la liste des descriptions !')
            var elements = `${staff[0]} a warn ${pseudo[0]} pour "${raison[0]}"` + '\n'
            for (let i = 1; i < result.length ; i++) {
                    elements += `${staff[i]} a warn ${pseudo[i]} pour "${raison[i]}"` + '\n'
            }

            if (staff[0] == undefined) {
                // inside a command, event listener, etc.
                const Embed = new EmbedBuilder()
                .setColor(0x00AF18)
                .setTitle('Aucun elements a afficher.')
                .setTimestamp()

                interaction.reply({ embeds: [Embed] });
            } else {
                // inside a command, event listener, etc.
                const Embed = new EmbedBuilder()
                .setColor(0x00AF18)
                .setTitle(`warns :`)
                .setDescription(`${elements}`)
                .setTimestamp()

                interaction.reply({ embeds: [Embed] });
            }
        }).catch((err) => {
            console.log(err);
            interaction.reply('Il y\'a une erreur')
        });
    }
}