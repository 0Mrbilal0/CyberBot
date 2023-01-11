const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const { createReadStream } = require('node:fs');
const { join } = require('node:path');
const { createAudioResource, createAudioPlayer, StreamType } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('test')
                .setDescription('Commande test fonctions')
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        let connection = joinVoiceChannel({
            channelId: interaction.channel.id,
            guildId: interaction.channel.guild.id,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        })

        const player = createAudioPlayer();
        // Basic, default options are:
        // Input type is unknown, so will use FFmpeg to convert to Opus under-the-hood
        // Inline volume is opt-in to improve performance
        let resource = createAudioResource(join(__dirname, '../musics/Binks to Binks 7.mp3'));

        // Will use FFmpeg with volume control enabled
        resource = createAudioResource(join(__dirname, '../musics/Binks to Binks 7.mp3'), { inlineVolume: true });
        resource.volume.setVolume(0.5);

        connection.on(VoiceConnectionStatus.Ready, () => {
            interaction.reply('The connection has entered the Ready state - ready to play audio!')
            // console.log(resource);
            player.play(resource)
            connection.subscribe(player)
                player.on(AudioPlayerStatus.Idle, () => {
                    // console.log(oldState + ' - ' + newState);
                    // console.log(AudioPlayerStatus);
                    setTimeout(() => {
                        interaction.guild.channel.send('Un truc')
                    }, 5000);
                    setTimeout(() => {
                        connection.destroy()
                    }, 10000);
                })
        })

    }
}