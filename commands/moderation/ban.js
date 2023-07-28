const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban quelqu\'un')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Indiquez l\'utilsateur que vous voulez ban'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        
    }
}