const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();
require('./deploy-commands.js');
const { sequelize } = require('./models/index')
const { QueryTypes } = require('sequelize')

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

//recuperation du token
const token = process.env.token;

// Ajout de la getions de fichiers
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
		setCommandDB(command.data.name, command.data.description)
		// console.log(command.data.name + ' + ' + command.data.description);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
	
}

async function setCommandDB(name, description) {
	await sequelize.query(`INSERT INTO commands (name,description,createdAt) VALUES ('${name}','${description}', NOW())`, { type: QueryTypes.INSERT }).then((res) => {
		console.log(res);
	}).catch((err) => {
		if (err.name != 'SequelizeUniqueConstraintError') {
			console.log(err.name);
		}
	})
}

/** Importer les commands du dossier musics qui etait crée. **/ 
// const musicsPath = path.join(__dirname, 'commands/musics');
// const musicsFiles = fs.readdirSync(musicsPath).filter(file => file.endsWith('.js'));

// for (const musicfile of musicsFiles) {
// 	const musicFilePath = path.join(musicsPath, musicfile);
// 	const music = require(musicFilePath);
// 	// Set a new item in the Collection with the key as the command name and the value as the exported module
// 	if ('data' in music && 'execute' in music) {
// 		client.commands.set(music.data.name, music);
// 	} else {
// 		console.log(`[WARNING] The command at ${musicsFilePath} is missing a required "data" or "execute" property.`);
// 	}
// }

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);