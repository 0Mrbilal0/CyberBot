const { REST, Routes } = require('discord.js')
const fs = require('node:fs')
require('dotenv').config()

const token = process.env.token
const clientId = process.env.client_id;
const commands = []

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for ( const file of commandFiles ) {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
}

const rest = new REST().setToken(token);

(async () => {
	try {
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (err) {
		console.error(err);
	}
})();