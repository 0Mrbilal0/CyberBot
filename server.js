const { Client , GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config()
const fs = require('node:fs');
const path = require('node:path');
// const deploy = require() // Mettre si je veux deployé les commands a chaque re/lancement du bot

/** Creation d'une nouvelle instance */
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildVoiceStates, 
        GatewayIntentBits.GuildPresences
    ] 
})

/** Récuperation de tout les sous dossier */
const directoryPath = path.resolve(__dirname, 'commands');

function getAllSubdirectories(directory) {
  const subdirectories = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  entries.forEach((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      subdirectories.push(entryPath);

      const subSubdirectories = getAllSubdirectories(entryPath)
      subdirectories.push(...subSubdirectories)
    }
  });

  return subdirectories;
}

const allSubdirectories = getAllSubdirectories(directoryPath) // la constante vas contenir un tableau de tout les chemin des dossiers

/** Récuperation du token */
const token = process.env.Token

/** Ajout de la gestion des fichiers */
client.commands = new Collection()

/**
 * Le for va servir a envoyé dans le client chaque commands.
 * Chaque commands sont divisé en deux parties : la data et le code qui sera executé (execute)
*/
for (const commandsPath of allSubdirectories){
    const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')) // Creation de la variable qui va contenir chaque nom des commands (chaque fichier a son nom qui se termine par .js)
    for (const file of commandsFiles) {
        const filePath = path.join(commandsPath, file)
        const command = require(filePath)

        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command)
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

/** Ajout de la gestion des evenements */
const eventsPaths = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPaths).filter(file => file.endsWith('.js'))

for ( const file of eventFiles) {
    const filePath = path.join(eventsPaths, file)
    const event = require(filePath)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

/** Ajout du token qui permet le lien entre l'instance du bot et le code */
client.login(token)