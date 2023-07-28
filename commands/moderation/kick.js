const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick quelqu\'un')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Indiquez l\'utilsateur que vous voulez ban'))
        .setDefaultMemberPermissions(PermissionsBitField.StageModerator),
    
    async execute(interaction) {
        
    }
}