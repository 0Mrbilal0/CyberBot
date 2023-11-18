const { EmbedBuilder } = require('discord.js');

export function EmbedsBuilder(color, title, description, author, footer) {
  const embeds = new EmbedBuilder()
    .setColor(color || null)
    .setTitle(title || null)
    .setDescription(description || null)
    .setAuthor(author || null)
    .setFooter(footer || null);
  return embeds;
}
