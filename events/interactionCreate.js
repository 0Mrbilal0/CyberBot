const { Events } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return
		const command = interaction.client.commands.get(interaction.commandName)

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`)
			return
		}

		try {
			await command.execute(interaction)
			console.log(`La commande ${command['data'].name} a été faite par ${interaction.user.username}`)
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`)
			console.error(error)
		}
	},
};