const { SlashCommandBuilder, PermissionFlagsBits, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder, ButtonBuilder, Emoji, GuildEmoji, ButtonStyle } = require('discord.js')
const { createReadStream } = require('node:fs');
const { join } = require('node:path');
const { createAudioResource, createAudioPlayer, StreamType } = require('@discordjs/voice');
const { log } = require('node:console');

module.exports = {
    data: new SlashCommandBuilder()
                .setName('test')
                .setDescription('Commande test fonctions')
                .addUserOption(option =>
                    option.setName('pseudo')
                            .setDescription('Pseudo de la personne')
                            .setRequired(false))
                .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        // let connection = joinVoiceChannel({
        //     channelId: interaction.channel.id,
        //     guildId: interaction.channel.guild.id,
        //     adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        // })

        // const player = createAudioPlayer();
        // // Basic, default options are:
        // // Input type is unknown, so will use FFmpeg to convert to Opus under-the-hood
        // // Inline volume is opt-in to improve performance
        // let resource = createAudioResource(join(__dirname, '../musics/Binks to Binks 7.mp3'));

        // // Will use FFmpeg with volume control enabled
        // resource = createAudioResource(join(__dirname, '../musics/Binks to Binks 7.mp3'), { inlineVolume: true });
        // resource.volume.setVolume(0.5);

        // connection.on(VoiceConnectionStatus.Ready, () => {
        //     interaction.reply('The connection has entered the Ready state - ready to play audio!')
        //     // console.log(resource);
        //     player.play(resource)
        //     connection.subscribe(player)
        //         player.on(AudioPlayerStatus.Idle, () => {
        //             // console.log(oldState + ' - ' + newState);
        //             // console.log(AudioPlayerStatus);
        //             setTimeout(() => {
        //                 interaction.guild.channel.send('Un truc')
        //             }, 5000);
        //             setTimeout(() => {
        //                 connection.destroy()
        //             }, 10000);
        //         })
        // })
        // let user = await interaction.user.fetch()
        // interaction.reply(user.bannerURL()+"?size=4096")
        // console.log(user);
        
        // if (!interaction.isChatInputCommand()) return;
		// // Create the modal
		// const modal = new ModalBuilder()
		// 	.setCustomId('mymodal')
		// 	.setTitle('My Modal');
            
        //     // Add components to modal
            
        //     // Create the text input components
        //     const favoriteColorInput = new TextInputBuilder()
		// 	.setCustomId('favoriteColorInput')
		//     // The label is the prompt the user sees for this input
		// 	.setLabel("What's your favorite color?")
		//     // Short means only a single line of text
		// 	.setStyle(TextInputStyle.Short);
            
        //     const hobbiesInput = new TextInputBuilder()
		// 	.setCustomId('hobbiesInput')
		// 	.setLabel("What's some of your favorite hobbies?")
		//     // Paragraph means multiple lines of text.
		// 	.setStyle(TextInputStyle.Paragraph);

        //     // An action row only holds one text input,
        //     // so you need one action row per text input.
        //     const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        //     const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

        //     // Add inputs to the modal
        //     modal.addComponents(firstActionRow, secondActionRow);
            
        //     // Show the modal to the user
        //     await interaction.showModal(modal);

        //     const filter = (interaction) => interaction.customId === 'mymodal';
        //     interaction.awaitModalSubmit({ filter, time: 15_000 })
        //     .then(interaction => {
        //         const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
        //         const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
        //         interaction.reply({ content:`Reponse 1: ${favoriteColor}\nReponse 2: ${hobbies}`, ephemeral: true})
        //     })

        //     .catch(console.error);
        
        const button = new ButtonBuilder()
            .setCustomId('button')
            .setEmoji('796478496188530768')
            .setLabel('Un boutton')
            // .setURL('https://discord.gg/ZAthArD7')
            .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder()
            .addComponents(button)

        const embed = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle('Ceci est un titre')
            .setURL('https://google.com/')
            .setAuthor({name:'Author', iconURL:'https://i.imgur.com/AfFp7pu.png', url:'https://google.com/'})
            .setDescription('Ceci est une description')
            // .setFooter('Un footer')
        const reponse = await interaction.reply({
            embeds:[embed],
            components: [row],
            ephemeral: false,
        })

        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await reponse.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            if (confirmation.customId == 'button') {
                // interaction.deleteReply()
                interaction.editReply({
                    content:'J\'ai appuyé sur le boutton ! ',
                    components: [],
                    embeds: []
                })
            } else {
                console.log('loupé');
            }
        } catch (err) {
            console.error;
        }
        
        // .send("Test")


        }
}