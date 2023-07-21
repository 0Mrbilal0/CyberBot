const { Events, RichPresenceAssets } = require('discord.js');
const rpc = require("discord-rpc");
const rpcClient = new rpc.Client({ transport: 'ipc' });

module.exports = {
  name: Events.ClientReady, // Remplacez 'event_name' par le nom de votre événement personnalisé
  once: true,
  execute(client) {	
	console.log(`Ready! Logged in as ${client.user.tag}`)
  },
};