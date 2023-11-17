const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affichage des commands'),

    async execute(interaction) {
        const commandsObj = require('../../commands')
        let commands = [];

        for (const key in commandsObj) {
            commands.push({name: commandsObj[key].name, description: commandsObj[key].description})
        }
        
        let commandList = ['','']
        commands.forEach(element => {
            commandList[0] += element.name+'\n'
            commandList[1] += element.description+'\n'
        });
        const embed = new EmbedBuilder()
            .setTitle('Liste des commandes')
            .setColor('DarkBlue')
            .setFields(
                { name: 'Name', value: commandList[0], inline: true },
                { name: 'Description', value: commandList[1], inline: true }
            )

        interaction.reply({
            content: '',
            embeds: [embed],
            ephemeral: true
        })
    }
}