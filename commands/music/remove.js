const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'makni',
    description: "makni pjesmu iz reda",
    voiceChannel: true,
    options: [
        {
            name: 'pjesma',
            description: 'ime ili url od pjesme koju zelis maknuti',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'broj',
            description: 'broj u redu',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) { 
        const number =  inter.options.getNumber('broj')
        const track = inter.options.getString('pjesma');

        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });
        if (!track && !number) inter.reply({ content: `Trebas odabrati jednu od opcija da makneš pjesmu ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

        if (track) {

        for (let song of queue.tracks) {
            if (song.title === track || song.url === track ) {
                queue.remove(song)
                return inter.reply({ content: `maknuta ${track} iz reda ✅` });
            }

        }

        return inter.reply({ content: `nemogu pronaći ${track} ${inter.member}... pokušaj korititi url pjesme ili puni naziv pjesme ❌`, ephemeral: true });    
        }

        if (number) {

            const index = number - 1
            const trackname = queue.tracks[index].title

            if (!trackname) return inter.reply({ content: `Ovaj track izgleda da ne postoji ${inter.member}...  pokušaj ponovno ?❌`, ephemeral: true });   

            queue.remove(index);
            
            return inter.reply({ content: `Maknut ${trackname} iz reda ✅` });
        }


         
    }
}