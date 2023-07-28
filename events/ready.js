const { Events, ActivityType, AttachmentBuilder, Attachment } = require('discord.js')
const cron = require('node-cron')
const fs = require('node:fs')
const path = require('node:path')
require('dotenv').config()

const connectDB = require('../config/db')
const takeShop  = require('../autoMessage/fortnite.shop')
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
    const channel = client.channels.cache.get('1133154729636151317')
    channel.bulkDelete(10)
    cron.schedule('0 7 * * *', () => {
      takeShop()
      try {
        
        for (let i = 1; i <= 4; i++) {
          const imagePath = path.join(__dirname, '../autoMessage/fortniteShopImage', `part${i}.png`)
          const imageBuffer = fs.readFileSync(imagePath)

          
          
          channel.send({
            files : [{
              attachment: imageBuffer,
              name: 'file.png',
              description: 'Cesont les parties du shop fortnite.'
            }]
          })
        }
      } catch (error) {
        console.error
      }
    }, null, true, 'Europe/Paris')
  },
};

