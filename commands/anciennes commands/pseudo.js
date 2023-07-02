const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('pseudo')
                .setDescription('Mets ton nom prenom RP afin d acceder au serveur')
                .addStringOption(option =>
                    option.setName('nom')
                        .setDescription('Indique ton Nom RP')
                        .setRequired(true))
                .addStringOption(option => 
                    option.setName('prenom')
                        .setDescription('Indique ton Prenom RP')
                        .setRequired(true)),
                        
            async execute(interaction) {
                const Nom = interaction.options.data[0].value;
                const Prenom = interaction.options.data[1].value;
                interaction.member.setNickname(Nom + " " + Prenom).then(() => {
                    interaction.reply(`Nom : ${Nom}\nPrenom : ${Prenom}`);
                }).catch((err) => {
                    interaction.reply('Ton rôle est plus élevé que le miens. Fais le toi même !');
                    console.error(err.rawError.message);
                });
            }
}