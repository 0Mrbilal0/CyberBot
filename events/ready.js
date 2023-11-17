const { Events, ActivityType } = require('discord.js')
require('dotenv').config()

const connectDB = require('../config/db');
const uri = process.env.uri

module.exports = {
  name: Events.ClientReady,
  once: true,

  async execute(client) {
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