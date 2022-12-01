const { SlashCommandBuilder } = require('discord.js')
const { sequelize } = require('../models/index')
const { QueryTypes } = require('sequelize')


module.exports = {
    data: new SlashCommandBuilder()
                .setName('warn')
                .setDescription('Command pour mettre un avertissement sur un membre du serveur.')
                .addUserOption(option =>
                    option.setName('utilisateur')
                            .setDescription('L\'utilisateur à warn.')
                            .setRequired(true))
                .addStringOption(option =>
                    option.setName('raison')
                            .setDescription('La raison du warn')
                            .setRequired(true)),

    async execute(interaction) {
        //await interaction.reply('en developpement');
        //Pas sur
        var member = interaction.member.displayName
        var pseudo = interaction.options.getUser('utilisateur');
        var raison =  interaction.options.getString('raison')
        const date = `NOW()`
        
        //const result = await sequelize.query(`INSERT INTO warns (pseudo, raison, createdAt) VALUES ("${pseudo}", "${raison}", ${date})`, { type: QueryTypes.INSERT })
        sequelize.query(`INSERT INTO warns (staff, pseudo, raison, createdAt) VALUES ("${member}","${pseudo}", "${raison}", ${date})`, { type: QueryTypes.INSERT }).then((res) => {
            console.log(res);
            switch (true) {
                case res[0] >= 3 && res[0] <= 5:
                    interaction.guild.members.kick(pseudo).then(() => {
                        interaction.reply(`@${pseudo.username} a 3 warns et s'est fait exclure.`);
                        interaction.guild.channels.cache.get('1036996167952773190').send(`@${pseudo.username} s'est fais kick par @${member} pour la raison suivante: "${raison}"`)
                        }).catch((err) => {
                            interaction.reply('Il y\'as une erreur')
                            console.log(err);
                        });
                    break;
                case res[0] > 5:
                    interaction.guild.members.ban(pseudo).then(() => {
                        interaction.reply(`@${pseudo.username} a plus de 5 warns et s'est fait ban.`);
                        interaction.guild.channels.cache.get('1036996167952773190').send(`@${pseudo.username} s'est fais ban par <@${member}> pour la raison suivante: "${raison}"`)
                        }).catch((err) => {
                            interaction.reply('Il y\'as une erreur')
                            console.log(err);
                        });
                    break;
                default:
                    interaction.reply(`${member} a warn ${pseudo} pour la raison : "${raison}"`)
                    break;
            }
        }).catch((err) => {
            console.log(err);
        });
    }
}