const { REST, Routes } = require('discord.js');
require('dotenv').config();

const token = process.env.Token;
const clientId = process.env.client_id;
const rest = new REST().setToken(token);
const commands = require('./commands');

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