const { Events } = require('discord.js');
const { ConnectionAcquireTimeoutError } = require('sequelize');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
	
};