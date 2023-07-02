const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { sequelize } = require('../../models/index')
const { QueryTypes } = require('sequelize')
module.exports = {
    data: new SlashCommandBuilder()
                .setName('set')
                .setDescription('Settings du bot')
                .addSubcommand(logs =>
                    logs.setName('logs')
                            .setDescription('Definir le salon Logs')
                            .addChannelOption(option =>
                                option.setName('channel')
                                        .setDescription('Le salon en question.')
                                        .setRequired(true)))
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        var channel = interaction.options.getChannel('channel')
        var channelId = parseInt(channel)
        // const result = await sequelize.query(`INSERT INTO logschannels ( idchannel, createdAt ) VALUES (${channelId}, NOW())`, { type: QueryTypes.INSERT })

        console.log(channel);
    },
}