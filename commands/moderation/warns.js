const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const postWarns = require('../../models/postWarns.model')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warns')
        .setDescription('Warn quelqu\'un')
        .addUserOption(option => 
            option
                .setName('user')
                .setDescription('Indiquez l\'utilsateur que vous voulez ban')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    
    async execute(interaction) {
        const target = interaction.options.getUser('user')
        const warns = await postWarns.find({targetId: target.id}).exec()
        if (!warns[0]) return

        let embed = new EmbedBuilder()
            .setTitle(`Liste des warns de ${target.username}`)
            .setColor(`Red`)
            // .setFooter(new Date().now())
        
        for (const key in warns) {
            if (Object.hasOwnProperty.call(warns, key)) {
                const element = warns[key];
                if (element.reason !== null) {
                    embed.addFields({
                        name: `__Warn ${key}__`,
                        value: 'Raison : ' + element.reason,
                        inline: false
                    })
                } else {
                    embed.addFields({
                        name: `__Warn ${key}__` ,
                        value: 'aucune raison',
                        inline: false
                    })

                }
            }
        }
        interaction.reply({
            embeds: [embed],
            ephemeral: true
        }) 
    }
}