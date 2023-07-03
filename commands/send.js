const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
                .setName('send')
                .setDescription('Envoyez un message.')
                .addSubcommand(option =>
                    option
                        .setName('question')
                        .setDescription('Envoyez un questionnaire.')
                        .addBooleanOption(option =>
                            option
                                .setName('private')
                                .setDescription('Choisis si c\'est un test ou un envoie')
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
        const statePrivate = interaction.options.getBoolean('private')
        const resChannel = interaction.options.getBoolean('channel')
        // console.log(state);
        const form = new ModalBuilder()
            .setCustomId('formulaire')
            .setTitle('Choisis tes questions.')

        // Couleur
        const couleurInput = new TextInputBuilder()
            .setCustomId('couleur')
            .setLabel('Quel est ta couleur ?')
            .setPlaceholder('Indiquez une couleur en hexadecimal. Default = Blurple')
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        const couleurActionRow = new ActionRowBuilder().addComponents(couleurInput)
        form.addComponents(couleurActionRow)
        
        // Auteur
        const auteurInput = new TextInputBuilder()
            .setCustomId('auteur')
            .setLabel('Qui est l\'auteur du message')
            .setPlaceholder('Ecrivez qui est l\'auteur du message')
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        const auteurActionRow = new ActionRowBuilder().addComponents(auteurInput)
        form.addComponents(auteurActionRow)
        
        // Titre
        const titreInput = new TextInputBuilder()
            .setCustomId('titre')
            .setLabel('Quel va être le titre ?')
            .setPlaceholder('Ecrivez le titre du message.')
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

        // Footer
        const footerInput = new TextInputBuilder()
            .setCustomId('footer')
            .setLabel('Quel va être le footer ?')
            .setPlaceholder('C\'est ce qui va etre mis en bas du message en footer.')
            .setStyle(TextInputStyle.Short)
            .setRequired(false)
        const footerActionRow = new ActionRowBuilder().addComponents(footerInput);
        form.addComponents(footerActionRow)

        await interaction.showModal(form);
        
        const filter = (interaction) => interaction.customId === 'formulaire';
            interaction.awaitModalSubmit({ filter, time: 480_000 })
            .then(interaction => {
                const resColor = interaction.fields.getTextInputValue('couleur')
                const resAuthor = interaction.fields.getTextInputValue('auteur');
                const resTitle = interaction.fields.getTextInputValue('titre')
                const rescontenu = interaction.fields.getTextInputValue('contenu')
                const resFooter = interaction.fields.getTextInputValue('footer')

                const embed = new EmbedBuilder()
                    .setColor(resColor || 'Blurple')
                    .setAuthor({name:resAuthor || null})
                    .setTitle(resTitle)
                    .setDescription(rescontenu)
                    .setFooter({text:resFooter || null})
                    
                const response = interaction.guild.channels.cache.get(resChannel).send({
                    embeds: [embed],
                    ephemeral:statePrivate
                })
                // const response =  interaction.reply({embeds:[embed], ephemeral:statePrivate})

            }).catch(err => {
                console.error(err)
            });
            
    }
}