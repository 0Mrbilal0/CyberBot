const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Reply Pong'),
    //Fonctionne que va executer la commande
    async execute(interaction) {
        await interaction.reply('Pong!');
        console.log(`${interaction.user.username} à fait la commande ping !`);
},
}