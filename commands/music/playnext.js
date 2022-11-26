const { ApplicationCommandOptionType } = require('discord.js');
const { QueryType } = require('discord-player');

module.exports = {
    name: 'dalje',
    description: "pjesmu koju hoces pustit nakon trenutne",
    voiceChannel: true,
    options: [
        {
            name: 'pjesma',
            description: 'pjesma koju želiš pustiti',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) { 
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

        const song = inter.options.getString('pjesma');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return inter.reply({ content: `Neam rezultata nađenih ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

       if (res.playlist) return inter.reply({ content: `Ova komanda ne podržava play liste ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

        queue.insert(res.tracks[0], 0)

        await inter.reply({ content:`Track je umetnut u red čekanja... reproducirati će se sljedeći 🎧`});

    }
}