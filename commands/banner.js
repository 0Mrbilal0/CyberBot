const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('banner')
                .setDescription('Afficher ta banniere de profil')
                .addUserOption(option =>
                    option.setName('pseudo')
                            .setDescription('Pseudo de la personne')
                            .setRequired(false)),
    async execute(interaction) {
        const target = await interaction.options.getUser("pseudo")?.fetch() || await interaction.user.fetch()
        if (target.bannerURL() !== null) {
            await interaction.reply(target.bannerURL()+"?size=4096");
            console.log(target.bannerURL());
        } else {
            await interaction.reply("Il n'y a pas de banniere a afficher !");
            console.log(target.bannerURL());
        }

        console.log(`${interaction.user.username} à fait la commande banner !`);
    },
}