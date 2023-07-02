const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
                .setName('send')
                .setDescription('Envoyez un message.')
                .addSubcommand(option =>
                    option
                        .setName('question')
                        .setDescription('Envoyez un questionnaire.')
                        // .addMentionableOption(option =>
                        //     option
                        //         .setName('author')
                        //         .setDescription('')
                        //     )
                        .addBooleanOption(option =>
                            option
                                .setName('private')
                                .setDescription('Choisis si c\'est un test ou un envoie')
                                .setRequired(true)
                        )
                        .addBooleanOption(option =>
                            option
                                .setName('author')
                                .setDescription('Ajout d\'un auteur.')
                                .setRequired(true)
                        )
                        .addChannelOption(option =>
                            option
                                .setName('channel')
                                .setDescription('Dans quel salon veux tu envoyé la question')
                                .addChannelTypes(ChannelType.GuildText)
                        )
                ),
                    
    async execute(interaction) {
        const state = interaction.options.getBoolean('private')
        console.log(state);
        const form = new ModalBuilder()
            .setCustomId('formulaire')
            .setTitle('Choisis tes questions.')

        // Couleur
        const couleurInput = new TextInputBuilder()
            .setCustomId('couleur')
            .setLabel('Quel est ta couleur ?')
            .setPlaceholder('Indiquez une couleur en hexadecimal.')
            .setStyle(TextInputStyle.Short)
        const couleurActionRow = new ActionRowBuilder().addComponents(couleurInput)
        form.addComponents(couleurActionRow)
        
        // Auteur
        const auteurInput = new TextInputBuilder()
            .setCustomId('auteur')
            .setLabel('Qui est l\'auteur du message')
            .setPlaceholder('Ecrivez qui est l\'auteur du message')
            .setStyle(TextInputStyle.Short)
        const auteurActionRow = new ActionRowBuilder().addComponents(auteurInput)
        form.addComponents(auteurActionRow)
        
        // Titre
        const titreInput = new TextInputBuilder()
            .setCustomId('titre')
            .setLabel('Quel va être le titre ?')
            .setPlaceholder('Ecris ta premiere question.')
            .setStyle(TextInputStyle.Short)
        const titreActionRow = new ActionRowBuilder().addComponents(titreInput);
        form.addComponents(titreActionRow)
        
        // Contenu
        const contenuInput = new TextInputBuilder()
            .setCustomId('contenu')
            .setLabel('Quel va être le contenue ?')
            .setPlaceholder('C\'est ce qui va etre mis en tant que description.')
            .setStyle(TextInputStyle.Paragraph)
        const contenuActionRow = new ActionRowBuilder().addComponents(contenuInput);
        form.addComponents(contenuActionRow)

        await interaction.showModal(form);
        
        const filter = (interaction) => interaction.customId === 'formulaire';
            interaction.awaitModalSubmit({ filter, time: 15_000 })
            .then(interaction => {
                const resAuthor = interaction.fields.getTextInputValue('auteur')
                const resTitle = interaction.fields.getTextInputValue('titre');
                const rescontenu = interaction.fields.getTextInputValue('contenu');
                const resColor = interaction.fields.getTextInputValue('')

                const embed = new EmbedBuilder()
                    ?.setTitle(resTitle)
                    .setDescription(rescontenu)
                    .setAuthor(resAuthor)
                    .setColor(resColor)
                    

                interaction.guild.channels.cache.get('725318402373058611').send({
                        embeds: [embed]

                    })
            }).catch(err => {
                interaction.reply('error')
                console.error(err)
            });
    }
}