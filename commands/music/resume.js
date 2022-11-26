module.exports = {
    name: 'nastavi',
    description: 'pusti track',
    voiceChannel: true,

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });
        
        if(queue.connection.paused) return inter.reply({content: 'Track se več pušta!', ephemeral: true})

        if(!queue.connection.paused) return inter.reply({content: `Track se več pušta, ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true})

        const success = queue.setPaused(false);
        
        return inter.reply({ content:success ? `Trenutna muzika ${queue.current.title} pauzirana ✅` : `Nešto je islo po zlu ${inter.member}... pokušaj ponovno ? ❌`});
    },
};
