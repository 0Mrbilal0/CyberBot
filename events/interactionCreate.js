const { Events } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return
		const command = interaction.client.commands.get(interaction.commandName)
		const mrbilal = await interaction.client.users.fetch('653245106400264212')

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

			mrbilal.send(`Error executing command '${interaction.commandName}': \`\`\`${err}\`\`\``)
            interaction.reply({
                content: 'Il y\'a une erreur, un message a ete envoyé au developpeur avec l\'erreur',
                ephemeral: true
            })
		}
	},
};