const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
                .setName('kick')
                .setDescription('Command pour kick un membre du serveur.')
                .addUserOption(option =>
                    option.setName('pseudo')
                            .setDescription('La personne à kick')
                            .setRequired(true))
                .addStringOption(option =>
                    option.setName('addreason')
                            .setDescription('Ajoutez une raison a l\'exclusion'))
                .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        if (interaction.member.permissions.has("KICK_MEMBERS")) {
            const target = interaction.options.getUser('pseudo');
            const addreason = interaction.options.getString('addreason');
            const member = interaction.user.id;

            console.log(member.username + ' kiked ' + target.username)
            interaction.guild.members.kick(target).then(() => {
            interaction.reply(`@${target.username} s'est fais kick. Il reviendra plus sage nous l'esperont`);
            setTimeout(() => {
                interaction.deleteReply()
            }, 5000);
            interaction.guild.channels.cache.get('1036996167952773190').send(`@${target.username} s'est fais kick par <@${member}> pour la raison suivante: "${addreason}"`)
            }).catch((err) => {
                // console.log(target + ' - ' + member)
                if (target == member) {
                    interaction.reply(err.message + ' : Tu ne peux pas te kick toi-même')
                }
                else {
                    interaction.reply(err.message + ' : Tu ne peux kick que les rang en dessous de toi')
                }
            });
        }
    }
}