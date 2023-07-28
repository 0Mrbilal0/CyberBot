const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
const path = require('node:path')
const fs = require('node:fs')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fortnite')
        .setDescription('Informations fortnite')
        .addSubcommand(option =>
            option
                .setName('shop')
                .setDescription('Affiche le shop fortnite de la journée')
        ),
    async execute(interaction) {
        switch (interaction.options.getSubcommand()) {
            case 'shop':
                const channel = await interaction.client.channels.fetch('1133154729636151317')
                const actualChannel = await interaction.channel.member
                console.log(actualChannel)
                for (let i = 1; i <= 4; i++) {
                    const imagePath = path.join(__dirname, '../../autoMessage/fortniteShopImage', `part${i}.png`);
                    const imageBuffer = fs.readFileSync(imagePath)
                    if (i == 1) {
                        await interaction.reply({
                            files: [imageBuffer],
                            ephemeral: true
                        })
                    }else {
                        await interaction.followUp({
                            files: [imageBuffer],
                            ephemeral: true
                        })
                    }
                }
                break;
            default:
                break;
        }
    }
}