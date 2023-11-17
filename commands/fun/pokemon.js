const { SlashCommandBuilder } = require('discord.js')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Attrapez votre pokemon rare.'),

    async execute(interaction) {
        interaction.reply({
            content: 'Tu as attrapé un GREEDY ! Le plus rare ! GG\nhttps://cdn.discordapp.com/avatars/277538258488000522/ce713e3552f9e9c9ecbeda5147e6c820.webp?size=4096',
        })
    }
}