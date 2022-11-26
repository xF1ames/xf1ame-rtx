const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'zvuk',
    description: 'promijeni',
    voiceChannel: true,
    options: [
        {
            name: 'zvuk',
            description: 'količina zvuka',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    execute({ inter }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });
        const vol = inter.options.getNumber('zvuk')

        if (queue.volume === vol) return inter.reply({ content: `Zvuk koji želiš promijenit je isti ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

        const success = queue.setVolume(vol);

        return inter.reply({ content:success ? `Zvuk je stavljen na : **${vol}**/**${maxVol}**% 🔊` : `Nešto je išlo po zlu ${inter.member}... pokušaj ponovno ? ❌`});
    },
};