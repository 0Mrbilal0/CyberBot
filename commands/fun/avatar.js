const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Afficher un avatar')
        .addUserOption(option =>
                option
                    .setName('user')
                    .setDescription('Precise un utilisateur pour voir son avatar')
                    .setRequired(false)
        ),
    
    async execute(interaction){
        /** Récuperation de l'utilisateur qui fait la command et de celui ciblé */
        const user = interaction.user
        const target = interaction.options.getUser('pseudo')
        const statePrivate = interaction.options.getBoolean('private')

        /** Afficher l'avatar de la source ou de celui ciblé */
        try {
            if (target !== null) {
                await interaction.reply({
                    content:target.avatarURL()+"?size=4096",
                    ephemeral:statePrivate
                })
            } else {
                await interaction.reply({
                    content:user.avatarURL()+"?size=4096",
                    ephemeral:statePrivate
                })
            }
            const message = await interaction.fetchReply()
            message.react('❤️')
        } catch (error) {
            console.error(error)
        }
    }
}