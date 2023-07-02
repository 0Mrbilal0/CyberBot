const { SlashCommandBuilder, GatewayIntentBits, Client, VoiceChannel } = require('discord.js')
const client = new Client({ intents: [GatewayIntentBits.GuildVoiceStates] });
const { joinVoiceChannel, VoiceConnectionStatus, getVoiceConnection, createAudioPlayer, createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('music')
                .setDescription('Liste des commands musiques')
                .addSubcommand(play =>
                    play
                        .setName('play')
                        .setDescription('Pour jouer un son')
                        .addStringOption(option =>
                            option.setName('music')
                                    .setDescription('Mets l\'url discord de ta musique')
                                    .setRequired(false)))
                .addSubcommand(stop =>
                    stop
                        .setName('stop')
                        .setDescription('Quitter le salon vocal'))
                .addSubcommand(next =>
                    next
                        .setName('next')
                        .setDescription('Mets la musique suivante'))
                .addSubcommand(pause =>
                    pause
                        .setName('pause')
                        .setDescription('Mets pause')),

    async execute(interaction) {
        /** Switch afin de verifier quel subcommand est utilisé **/
        switch (interaction.options.getSubcommand()) {
            case 'play':
                const music = interaction.options.getString('music')
                const player = createAudioPlayer()
                const resource = createAudioResource(music)
                console.log("Status 1 : " + VoiceConnectionStatus);
                /** connection au salon vocal **/
                let connection = joinVoiceChannel({
                    channelId: interaction.channel.id,
                    guildId: interaction.channel.guild.id,
                    adapterCreator: interaction.channel.guild.voiceAdapterCreator,
                })
                
                /** envoie d'un message quand le bot est connecter **/
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
                break;
            case 'stop':
                interaction.reply('En developpement !')
                setTimeout(() => {
                    interaction.deleteReply()
                }, 2000);
                console.log('command stop effectuée');
                player.on(AudioPlayerStatus, () => {
                    connection.destroy()
                })
                break;
            case 'next':
                interaction.reply('En developpement !')
                break;
            case 'pause':
                interaction.reply('En developpement !')
                break;
        }
        // const connection = getVoiceConnection( interaction.channel.id )
        }
    }
