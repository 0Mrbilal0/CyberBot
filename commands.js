const fs = require('node:fs');
const path = require('node:path');

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

module.exports = commands