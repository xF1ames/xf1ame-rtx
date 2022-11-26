module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Nema muzike koja se sad pušta ❌`, ephemeral: true });

    if (!queue.previousTracks[1]) return inter.reply({ content: `Nije bilo muzike koja se puštala prije ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

    await queue.back();

    inter.reply({ content:`Puštam **Prošli** track ✅`, ephemeral: true});
}
