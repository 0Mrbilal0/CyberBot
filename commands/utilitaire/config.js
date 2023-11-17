const { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js')
const postConfig = require('../../models/postConfigs.model')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configuration du bot')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const guildId = interaction.guild.id
        const modal = new ModalBuilder()
            .setCustomId('configuration')
            .setTitle('Configurez CyberBot en fonction de vos envies')

        const logsChannelInput = new TextInputBuilder()
            .setCustomId('logsChannel')
            .setLabel('Choisissez un salon où envoyé les logs.')
            .setMinLength(18)
            .setMaxLength(18)
            .setStyle(TextInputStyle.Short)
            .setRequired(false)

        const warnsKickNumberInput = new TextInputBuilder()
            .setCustomId('warnsKickNumber')
            .setLabel('Nombre de warns pour kick la cible')
            .setStyle(TextInputStyle.Short)
            .setRequired(false)

        const warnsBanNumberInput = new TextInputBuilder()
            .setCustomId('warnsBanNumber')
            .setLabel('Nombre de warns pour ban la cible')
            .setStyle(TextInputStyle.Short)
            .setRequired(false)

        const warnsTempBanNumberInput = new TextInputBuilder()
            .setCustomId('warnsTempBanNumber')
            .setLabel('Nombre de warns pour temp-ban la cible')
            .setStyle(TextInputStyle.Short)
            .setRequired(false)

        const logsActionRow = new ActionRowBuilder().addComponents(logsChannelInput);
        const warnsKickActionRow = new ActionRowBuilder().addComponents(warnsKickNumberInput);
        const warnsBanActionRow = new ActionRowBuilder().addComponents(warnsBanNumberInput);
        const warnsTempBanActionRow = new ActionRowBuilder().addComponents(warnsTempBanNumberInput);

        modal.addComponents(logsActionRow,warnsKickActionRow,warnsBanActionRow,warnsTempBanActionRow)
        await interaction.showModal(modal)

        //! Ecouteur d'evenement -->
        const submitted = await interaction.awaitModalSubmit({
            time: 60000,
            filter: i => i.user.id === interaction.user.id, // Verification de la personne qui repond en fonction de la personne qui crée le modal
        }).catch(err => {
            console.error(err)
            return null
        })
        if (!submitted) return
        const logsChannel = await submitted.fields.getTextInputValue('logsChannel');
        const warnsKickNumber = await submitted.fields.getTextInputValue('warnsKickNumber');
        const warnsBanNumber = await submitted.fields.getTextInputValue('warnsBanNumber');
        const warnsTempBanNumber = await submitted.fields.getTextInputValue('warnsTempBanNumber');

        const configGet = await postConfig.find({serverId: guildId}).exec()
        if (configGet == '') {
            const config = new postConfig({
                serverId: guildId,
                logschannel: logsChannel || null,
                warnsKick: warnsKickNumber || null,
                warnsBan: warnsBanNumber || null,
                warnsTempBan: warnsTempBanNumber || null,
            })

            await config.save()
                .then(() => {
                    submitted.reply({
                        content: `La configuration a été sauvegardée avec succès.`,
                        ephemeral: true
                    })
                })
                .catch(err => {
                    console.table(err)
                    if (err._message == 'config validation failed') {
                        submitted.reply({
                            content: `La configuration a echoué : "${err._message}"`,
                            ephemeral: true
                        })
                    } else {
                        submitted.reply({
                            content: `La configuration a echoué`,
                            ephemeral: true
                        })
                    }
                })
        } else if (configGet != '') {
            console.log('updateData')
            const updateData = {
                logschannel: logsChannel == "" ? configGet[0].logschannel : logsChannel,
                warnsKick: warnsKickNumber == "" ? configGet[0].warnsKick : warnsKickNumber,
                warnsBan: warnsBanNumber == "" ? configGet[0].warnsBan : warnsBanNumber,
                warnsTempBan: warnsTempBanNumber == "" ? configGet[0].warnsTempBan : warnsTempBanNumber,
            }
            postConfig.findOneAndUpdate({ serverId: guildId }, updateData).then(doc => {
                if (doc) {
                    console.log('Document mis à jour :', doc);
                    submitted.reply({
                        content: `La configuration a été sauvegardée avec succès.`,
                        ephemeral: true
                    })
                } else {
                  console.log('Aucun document trouvé pour la mise à jour.');
                }
              })
              .catch(err => {
                console.error('Erreur :', err);
                submitted.reply({
                    content: `La configuration a echoué.`,
                    ephemeral: true
                })
              })
        }       

    }
}