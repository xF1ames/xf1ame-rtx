const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
    .setAuthor({name: `Krenuto puštati ${track.title} u ${queue.connection.channel.name} 🎧`, iconURL: track.requestedBy.avatarURL()})
    .setColor('#13f857')

    const back = new ButtonBuilder()
    .setLabel('Nazad')
    .setCustomId(JSON.stringify({ffb: 'back'}))
    .setStyle('Primary')

    const skip = new ButtonBuilder()
    .setLabel('Preskoci')
    .setCustomId(JSON.stringify({ffb: 'skip'}))
    .setStyle('Primary')

    const resumepause = new ButtonBuilder()
    .setLabel('Pauziraj & nastavi')
    .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
    .setStyle('Danger')

    const loop = new ButtonBuilder()
    .setLabel('Petlja')
    .setCustomId(JSON.stringify({ffb: 'loop'}))
    .setStyle('Secondary')
    
    const queuebutton = new ButtonBuilder()
    .setLabel('Red')
    .setCustomId(JSON.stringify({ffb: 'queue'}))
    .setStyle('Secondary')
    

    const row1 = new ActionRowBuilder().addComponents(back, loop, resumepause, queuebutton, skip)
    queue.metadata.send({ embeds: [embed], components: [row1] })
});

player.on('trackAdd', (queue, track) => {
   
    queue.metadata.send(`Track ${track.title} dodan je u red ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('Ja sam bio ručno izbačen iz poziva... Mičem sav red ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Nitko nije u voice kanalu... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('Dovršio sam puštati cijeli queue ✅');
});

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`Sve pjesme u playlisti dodane su u queue ✅`);
});