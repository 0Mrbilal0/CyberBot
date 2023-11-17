const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const postWarns = require('../../models/postWarns.model')
const postConfig = require('../../models/postConfigs.model')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Avertissement sur une personne.')
        .addUserOption(options =>
            options
                .setName('user')
                .setDescription('Membre qui doit être avertie')
                .setRequired(true))
        .addStringOption(options =>
            options
                .setName('reason')
                .setDescription('Indique la raison du warn'))
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const guildId = interaction.guild.id
        const target = interaction.options.getUser('user')
        const targetObj = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason')
        const author = interaction.user
        
        const warns = new postWarns({
            targetId: target.id,
            targetUsername: target.username,
            reason: reason,
            author: author.username,
        })

        await warns.save()
            .then(() => {
                interaction.reply({
                    content: `${target} s'est fait warn par <@${author.id}>`,
                    ephemeral: true
                })
            })
            .catch(err => {
                console.log(err)
            })

            // Faire en sorte qu'au boud d'un certain nombre de warn l'user soit kick ou ban
            const warnsByTargetId = await postWarns.find({targetId: target.id}).exec()
            const configuration = await postConfig.find({serverId: guildId}).exec()
            const maxWarnsKick = parseInt(configuration[0].warnsKick)
            const maxWarnsBan = parseInt(configuration[0].warnsBan)
            const maxWarnsTempBan = parseInt(configuration[0].warnsTempBan)

            console.log(warnsByTargetId.length)
            console.log(maxWarnsKick)
            console.log(maxWarnsBan)
            console.log(maxWarnsTempBan)

            switch (warnsByTargetId.length) {
                case maxWarnsKick:
                    console.log('kick')
                    try {
                        await targetObj.kick()
                        interaction.followUp({
                            content: `${targetObj.user.id} s'est fait kick avec succes.`,
                            ephemeral: true
                        })
                    } catch (err) {
                        if (err.code === 50013) {
                            await interaction.followUp({
                                content: `<@${targetObj.user.id}> est au minimum au meme rend que moi.\nJe ne peux donc pas kick cette personne.`,
                                ephemeral: true
                            })
                        } else {
                            await interaction.followUp({
                                content: `Il y'a eu une erreur lors du kick`,
                                ephemeral: true
                            })
                        }
                    }
                break;
                case maxWarnsBan:
                    console.log('ban')
                    try {
                        await targetObj.ban()
                        await interaction.followUp({
                            content: `${targetObj.user.id} s'est fait ban avec succes.`,
                            ephemeral: true
                        })
                    } catch (error) {
                        if (err.code === 50013) {
                            await interaction.followUp({
                                content: `<@${targetObj.user.id}> est au minimum au meme rend que moi.\nJe ne peux donc pas ban cette personne.`,
                                ephemeral: true
                            })
                        } else {
                            await interaction.followUp({
                                content: `Il y'a eu une erreur lors du ban`,
                                ephemeral: true
                            })
                        }
                    }
                break;
                // case maxWarnsTempBan:
                //     await targetObj.ban()
                //     interaction.reply({
                //         content: `${targetObj.user.username} s'est fait kick avec succes.`,
                //         ephemeral: true
                //     })
                // break;
            } 
        
    }
}