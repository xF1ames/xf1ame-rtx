module.exports = {
    name: 'nazad',
    description: "idi na pjesmu prije",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

        if (!queue.previousTracks[1]) return inter.reply({ content: `Nije bilo muzike puštane prije ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

        await queue.back();

        inter.reply({ content:`Puštam **prošli** track ✅`});
    },
};