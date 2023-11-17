const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick quelqu\'un')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Indiquez l\'utilsateur que vous voulez ban')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionsBitField.StageModerator),
    
    async execute(interaction) {
        const userObj = interaction.options.getMember('user')
        try {
            await userObj.kick()
            interaction.reply({
                content: `${userObj.user.username} s'est fait kick avec succes.`,
                ephemeral: true
            })
        } catch (err) {
            console.error(err.rawError.code)
            if (err.rawError.code === 50013) {
                await interaction.reply({
                        content:`Je n\'ai pas la permission de kick <@${user.user.id}>.`,
                        ephemeral:true
                })
            }
            // interaction.reply(err)
        }
    
    }
}