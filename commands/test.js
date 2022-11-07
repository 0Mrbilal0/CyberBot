const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('test')
                .setDescription('Commande test fonctions')
                .addMentionableOption(option => 
                    option.setName('personne')
                            .setDescription('Une personne mentionner.')
                            .setRequired(true))
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        await interaction.reply('sur la console');
        const member = interaction.options.data[0].user.id;
        console.log(interaction.guild.members.fetch().then(console.log).catch(console.error));
        // switch (member) {
        //     case value:
                
        //         break;
        
        //     default:
        //         break;
        // }
    }
}