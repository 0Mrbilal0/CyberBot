const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
require('dotenv').config
const mariadb= require('mariadb')
const dbuser = process.env.dbuser
const dbpassword = process.env.dbpassword

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
        interaction.reply('rien');
    }
}