const { QueueRepeatMode } = require('discord-player');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'petlja',
    description: 'ukljuci ili iskljuci ponavljanje pjesme/reda',
    voiceChannel: true,
    options: [
        {
        name: 'akcija' ,
        description: 'koju akciju zeliš ponavljati',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Red', value: 'enable_loop_queue' },
            { name: 'Iskljuci', value: 'disable_loop'},
            { name: 'Pjesma', value: 'enable_loop_song' },
        ],
    }
    ],
    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });
        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === 1) return inter.reply({ content:`Prvo moraš isključiti trenutnu muziku u ponavljanju (/pelja Iskljuci) ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.QUEUE);

                return inter.reply({ content:success ? `Mod ponavljanja **uključen** cijeli red će se ponavljati beskrajno 🔁` : `Nešto je išlo po zlu ${inter.member}... pokušaj ponovno ? ❌` });
                break
            }
            case 'disable_loop': {
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);

                return inter.reply({ content:success ? `Mod ponavljanja **isključen**` : `Nešto je išlo po zlu ${inter.member}... pokušaj ponovno ? ❌` });
                break
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === 2) return inter.reply({ content:`Prvo moraš isključiti trenutnu muziku u ponavljanju (/pelja Iskljuci) ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

                const success = queue.setRepeatMode( QueueRepeatMode.TRACK);
                
                return inter.reply({ content:success ? `Mod ponavljanja **uključen** trenutna pjesma če se ponavljati beskrajno` : `Nešto je išlo po zlu ${inter.member}... pokušaj ponovno ? ❌` });
                break
            }
        }
       
    },
};