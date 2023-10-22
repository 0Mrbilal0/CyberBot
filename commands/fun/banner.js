const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Affiche une banniere')
        .addBooleanOption(option =>
            option
            .setName('private')
            .setDescription('Rendre le message privée')
            .setRequired(true)
        )
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Precisez un utilisateur')
        ),

    async execute(interaction){
        const target = await interaction.options.getUser("user")?.fetch() || await interaction.user.fetch()
        const statePrivate = interaction.options.getBoolean('private')

        if (target.bannerURL() !== null) {
            await interaction.reply({
                content: target.bannerURL()+"?size=4096",
                ephemeral: statePrivate
            })
        // console.log('Voici l\'url de la banniere de la cible: ' + target.bannerURL())
        } else {
            await interaction.reply({
                content: 'Il n\'y a pas de banniere a afficher !',
                ephemeral: statePrivate
            })
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)
            // console.log('Voici l\'url de la banniere de la cible: ' + target.bannerURL())
        }
    }
};