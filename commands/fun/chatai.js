const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: OpenAI } = require("openai");
const { EmbedsBuilder } = require("../../config/embed");
require("dotenv").config;

const tokenAI = process.env.OPENAI_KEY;

const openai = new OpenAI({
  apiKey: tokenAI,
});

async function getResponse(question, subject) {
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        subject
          ? {
              role: "system",
              content: `donne seulement des reponse en rapport avec ${subject}`,
            }
          : { role: "system", content: "aucun parametre donné" },
        { role: "user", content: question },
      ],
    });
    const response = result.choices[0].message.content;
    return response;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("chat")
    .setDescription("Pose ta question")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("Quel est votre question ?")
        .setMaxLength(1000)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("sujet")
        .setDescription("Mets un sujet s'il y'en a un")
        .setMaxLength(50)
        .setRequired(false)
    ),

  async execute(interaction) {
    const question = interaction.options.getString("question");
    const subject = interaction.options.getString("sujet");
    const user = interaction.user;
    await interaction.reply({ content: `Salut ${user}, laisse moi réflechir à ta question...` });
    
    const response = await getResponse(question, subject);
    console.log(response);

    // const embed = new EmbedBuilder()
    //   .setTitle('__'+question+'__')
    //   .setDescription(response)
    //   .setColor("Blue");

    interaction.editReply({
      content:'Merci de votre patience.\nVoici ma reponse: ',
      embeds: [EmbedsBuilder('Blue', '__'+question+'__', response )],
    });
  },
};
