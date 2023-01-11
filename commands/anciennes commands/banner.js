const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('banner')
                .setDescription('Afficher ta photo de profil')
                .addUserOption(option =>
                    option.setName('pseudo')
                            .setDescription('Pseudo de la personne')
                            .setRequired(false)),
    async execute(interaction) {
        const user = interaction.member;
        const target = interaction.options.getUser('pseudo');
        console.log(user);
        if (target !== null) {
            await interaction.reply(target.bannerURL());
        } else {
            await interaction.reply(user.bannerURL());
        }
        
        console.log(`${interaction.user.username} à fait la commande banner !`);
    },
}