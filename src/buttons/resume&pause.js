module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.playing) return inter.reply({ content: `Nema muzike koja se sad pušta ❌`, ephemeral: true });

    const success = queue.setPaused(false);
    
    if (!success) queue.setPaused(true);
    

    return inter.reply({ content: `${success ? `Trenutna ${queue.current.title} pauzirana ✅` : `Trenutna muzika ${queue.current.title} nastavljena ✅`}`, ephemeral: true});
}