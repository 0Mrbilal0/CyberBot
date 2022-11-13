const { Events } = require('discord.js');
const mariadb = require('mariadb');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	}
};