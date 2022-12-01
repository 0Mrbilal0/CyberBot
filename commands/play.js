const { SlashCommandBuilder, GatewayIntentBits, Client } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates] });
const { joinVoiceChannel, VoiceConnectionStatus, getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');


module.exports = {
    data: new SlashCommandBuilder()
                .setName('play')
                .setDescription('Lancez vos musiques !')
                .addStringOption(option =>
                    option.setName('music')
                            .setDescription('Mets l\'url discord de ta musique')
                            .setRequired(false))
                ,
                
    async execute(interaction) {
        const music = interaction.options.getString('music')
        const player = createAudioPlayer()
        const resource = createAudioResource(music)
        // const connection = getVoiceConnection( interaction.channel.id )
        
            const connection = joinVoiceChannel({
                channelId: interaction.channel.id,
                guildId: interaction.channel.guild.id,
                adapterCreator: interaction.channel.guild.voiceAdapterCreator,
            })
        
            connection.on(VoiceConnectionStatus.Ready, () => {
            interaction.reply('The connection has entered the Ready state - ready to play audio!')
        
            player.play(resource)
            connection.subscribe(player)

                player.on(AudioPlayerStatus.Idle, () => {
                    setTimeout(() => {
                        connection.destroy()
                    }, 1500);
                })
            })
            
        }
    }
