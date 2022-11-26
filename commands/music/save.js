const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'spremi',
    description: 'spremi trenutni track!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

        inter.member.send({
            embeds: [
                new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`:arrow_forward: ${queue.current.title}`)
                    .setURL(queue.current.url)
                    .addFields(
                        { name: ':hourglass: Trajanje:', value: `\`${queue.current.duration}\``, inline: true },
                        { name: 'Pjesma od:', value: `\`${queue.current.author}\``, inline: true },
                        { name: 'Pregledi :eyes:', value: `\`${Number(queue.current.views).toLocaleString()}\``, inline: true },
                        { name: 'URL Pjesme:', value: `\`${queue.current.url}\`` }
                    )
                    .setThumbnail(queue.current.thumbnail)
                    .setFooter({text:`iz servera ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false })})
            ]
        }).then(() => {
            return inter.reply({ content: `Ja sam ti posla naziv pjesme u privatne poruke ✅`, ephemeral: true });
        }).catch(error => {
            return inter.reply({ content: `Nemogu ti poslati privatnu poruku... probaj uključiti dm(ove) ili pokušaj ponovno ? ❌`, ephemeral: true });
        });
    },
};