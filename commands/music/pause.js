module.exports = {
    name: 'pauziraj',
    description: 'pauziraj track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'Ovaj track je trenutno pauziran!', ephemeral: true})

        if(queue.connection.paused) return inter.reply({content: `Ovaj track je trenutno pauziran, ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true})

        const success = queue.setPaused(true);
        
        return inter.reply({ content: success ? `Trenutna muzika ${queue.current.title} pauzirana ✅` : `Nešto je išlo po zlu ${inter.member}... pokušaj ponovno ? ❌` });
    },
};
