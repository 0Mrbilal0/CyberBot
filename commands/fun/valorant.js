const { default: axios } = require("axios");
const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('valorant')
        .setDescription('Informations valorant')
        .addSubcommand(option =>
            option
                .setName('map_image')
                .setDescription('Affiche une image de la map voulu')
        )
        .addSubcommand(option => 
            option
                .setName('map_plan')
                .setDescription('Affiche le plan de la map voulu')
        ),

    async execute(interaction) {
        const dataMap = await axios.get('https://valorant-api.com/v1/maps')
        const dataSelect = dataMap.data.data
        const dropDown = []

        dataSelect.forEach(element => {
            dropDown.push(
                new StringSelectMenuOptionBuilder()
                    .setLabel(element.displayName)
                    .setDescription(`Informations pour la map ${element.displayName}`)
                    .setEmoji('➡️')
                    .setValue(element.displayName)
            )
        })
        const select = new StringSelectMenuBuilder()
            .setCustomId('ChoixDeMap')
            .setPlaceholder('Choisis ta map.')
            .setOptions(dropDown)

        const cancelButton = new ButtonBuilder()
            .setCustomId('cancelButton')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Danger)

        const rowSelect = new ActionRowBuilder().addComponents(select)
        const rowButton = new ActionRowBuilder().setComponents(cancelButton)
        
        switch (interaction.options.getSubcommand()) {
            case 'map_image':
                const embedImageDefault = new EmbedBuilder()
                    .setColor('Aqua')
                    .setTitle(`Voici le plan de la map: ${dataSelect[0].displayName}`)
                    .setImage(dataSelect[0].splash)
                
                const reponseImage = await interaction.reply({
                    embeds:[embedImageDefault],
                    components: [rowSelect , rowButton],
                    ephemeral: false,
                })
                    try {
                        let i = 0
                        while (i === 0) {
                            const collectorFilter = i => i.user.id === interaction.user.id && (i.customId === 'ChoixDeMap' || i.customId === 'cancelButton')
                            const confirmation = await reponseImage.awaitMessageComponent({ filter: collectorFilter, time: 10000 })
                        
                            if (confirmation.customId === 'ChoixDeMap') {
                                const choix = confirmation.values
                                const choixMap = dataSelect.find(element => element.displayName == choix)
        
                                const embedImage = new EmbedBuilder()
                                    .setColor('Aqua')
                                    .setTitle(`Voici le plan de la map: ${choixMap.displayName}`)
                                    .setImage(choixMap.splash)
                                
                                confirmation.update({
                                    embeds:[embedImage],
                                    components: [rowSelect , rowButton],
                                    ephemeral: true,
                                })
                                console.log('Map choisie')
                            }
                                
                            if (confirmation.customId == 'cancelButton') {
                                console.log('cancel')
                                reponseImage.delete()
                                i = 1
                            }
                            setTimeout(() => {
                                console.log('cancel')
                                i = 1
                            }, 5000)
                        }
                        
                    } catch (error) {
                        console.error(error);
                    }
            break;
            case 'map_plan':
                const embedPlanDefault = new EmbedBuilder()
                    .setColor('Aqua')
                    .setTitle(`Voici le plan de la map: ${dataSelect[0].displayName}`)
                    .setImage(dataSelect[0].displayIcon)

                const reponsePlan = await interaction.reply({
                    embeds:[embedPlanDefault],
                    components: [rowSelect, rowButton],
                    ephemeral: true,
                })
                try {
                    let i = 0
                    while (i === 0) {
                        const collectorFilter = i => i.user.id === interaction.user.id && (i.customId === 'ChoixDeMap' || i.customId === 'cancelButton')
                        const confirmation = await reponsePlan.awaitMessageComponent({ filter: collectorFilter, time: 10000 })
                    
                        if (confirmation.customId === 'ChoixDeMap') {
                            const choix = confirmation.values
                            const choixMap = dataSelect.find(element => element.displayName == choix)
    
                            const embedPlan = new EmbedBuilder()
                                .setColor('Aqua')
                                .setTitle(`Voici le plan de la map: ${choixMap.displayName}`)
                                .setImage(choixMap.displayIcon)
                            
                            confirmation.update({
                                embeds:[embedPlan],
                                components: [rowSelect , rowButton],
                                ephemeral: true,
                            })
                            console.log('Map choisie')
                        }
                            
                        if (confirmation.customId == 'cancelButton') {
                            console.log('cancel')
                            reponsePlan.delete()
                            i = 1
                        }
                    }
                    
                } catch (error) {
                    console.error(error);
                }
            break;
        }
    }
};