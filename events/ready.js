const { Events, ActivityType } = require('discord.js');
const connectDB = require('../config/db');
require('dotenv').config()
const uri = process.env.uri

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
	  console.log(`Ready! Logged in as ${client.user.tag}`)
    client.user.setPresence({
      status: 'dnd',
      activities: [
        {
            name: 'en fabrication',
            type: ActivityType.Competing,
        },
      ],
    })
    connectDB(uri)
  },
};

