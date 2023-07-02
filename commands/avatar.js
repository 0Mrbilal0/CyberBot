const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('avatar')
                .setDescription('Afficher ta photo de profil')
                .addUserOption(option =>
                    option.setName('pseudo')
                            .setDescription('Pseudo de la personne')
                            .setRequired(false)),
                            
    async execute(interaction) {
        /* recuperation de l'utilisateur qui fait la command et de celui ciblé */
        const user = interaction.user;
        const target = interaction.options.getUser('pseudo');
        console.log(target + " - " + user)
        /* afficher l'avatar de la source ou de celui ciblé */
        if (target !== null) {
            await interaction.reply(target.avatarURL());
        } else {
            await interaction.reply(user.avatarURL());
        }
        console.log(`${interaction.user.username} à fait la commande avatar !`);
    },
}