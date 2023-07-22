const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const token = process.env.token;
const clientId = process.env.client_id;
const commands = [];

// Utiliser path.resolve() pour construire le chemin du répertoire 'commands'
const directoryPath = path.resolve(__dirname, 'commands');

function getAllSubdirectories(directory) {
  const subdirectories = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  entries.forEach((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      subdirectories.push(entryPath);

      const subSubdirectories = getAllSubdirectories(entryPath);
      subdirectories.push(...subSubdirectories);
    }
  });

  return subdirectories;
}

const allSubdirectories = getAllSubdirectories(directoryPath);

for (const subdirectory of allSubdirectories) {
  const commandFiles = fs.readdirSync(subdirectory).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(path.join(subdirectory, file));
    commands.push(command.data.toJSON());
  }
}

const rest = new REST().setToken(token);

(async () => {
  try {
    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands },
    );
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    console.log(directoryPath);
  } catch (err) {
    console.error(err);
  }
})();