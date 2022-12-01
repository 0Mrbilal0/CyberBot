const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { EmbedBuilder } = require('discord.js');
const { QueryTypes } = require('sequelize')
const { sequelize } = require('../models/index');
const { execute } = require('./listdesc');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('test')
                .setDescription('Commande test fonctions'),

    async execute(interaction) {
        execute(interaction)
    }
}