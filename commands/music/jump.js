const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'skok',
    description: "Skoci u odabrani track u redu",
    voiceChannel: true,
    options: [
        {
            name: 'pjesma',
            description: 'ime ili url pjesme na koju hocete skociti',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'broj',
            description: 'broj koj je ta pjesma u redu',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const track = inter.options.getString('pjesma');
        const number =  inter.options.getNumber('broj')

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Morate koristiti jednu od opcija da biste skočili na pjesmu ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

            if (track) {
        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.skipTo(song)
                return inter.reply({ content: `Presškočeno na ${track} ✅` });
            }
        }
        return inter.reply({ content: `nemogu pronači ${track} ${inter.member}... pokušaj koristiti url od pjesme ili njezin puni naziv ? ❌`, ephemeral: true });    
    }
    if (number) {
        const index = number - 1
        const trackname = queue.tracks[index].title
        if (!trackname) return inter.reply({ content: `Ovaj track izgleda da ne postoji ${inter.member}...  pokušaj ponovno ?❌`, ephemeral: true });   
        queue.skipTo(index);
        return inter.reply({ content: `Skočeno na ${trackname}  ✅` });
    }
         
    }
}