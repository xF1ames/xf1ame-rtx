const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'filter',
    description: 'dodaj filter u tvoj track',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: 'filter koji zelis dodati',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ inter, client }) {
        const queue = player.getQueue(inter.guildId);

        if (!queue || !queue.playing) return inter.reply({ content: `Nema muzike koja se sad pušta ${inter.member}... pokušaj ponovno ? ❌`, ephemeral: true });

        const actualFilter = queue.getFiltersEnabled()[0];

        const infilter = inter.options.getString('filter');


        const filters = [];

        queue.getFiltersEnabled().map(x => filters.push(x));
        queue.getFiltersDisabled().map(x => filters.push(x));

        const filter = filters.find((x) => x.toLowerCase() === infilter.toLowerCase());

        if (!filter) return inter.reply({ content: `Taj filter ne postoji ${inter.member}... pokušaj ponovno ? ❌\n${actualFilter ? `Filter trenutno aktivan ${actualFilter}.\n` : ''}Lista od dostupnih filtera ${filters.map(x => `**${x}**`).join(', ')}.`, ephemeral: true });

        const filtersUpdated = {};

        filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        await queue.setFilters(filtersUpdated);

        inter.reply({ content: `Filter ${filter} je sada **${queue.getFiltersEnabled().includes(filter) ? 'ukljucen' : 'iskljucen'}** ✅\n*Podsjetnik što je glazba duža, to će duže trajati.*` });
    },
};