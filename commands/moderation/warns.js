const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn quelqu\'un')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Indiquez l\'utilsateur que vous voulez ban'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    
    async execute(interaction) {
        
    }
}