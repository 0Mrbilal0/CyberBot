const { SlashCommandBuilder } = require("discord.js");
const { default: OpenAI } = require("openai");
require("dotenv").config;

const tokenAI = process.env.OPENAI_KEY;

const openai = new OpenAI({
  apiKey: tokenAI,
});

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

    try {
    //   const result = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       //   subject ? { role: "system", content: subject } : null,
    //       { role: "user", content: question },
    //     ],
    //   });

      const response = result.choices[0].message.content;
      console.log(response);
      await interaction.reply({
        content: 'une reponse',
        ephemeral: false,
      });
    } catch (error) {
      console.error(error);
      interaction.reply('une erreur s\'est produite');
    }
  },
};
