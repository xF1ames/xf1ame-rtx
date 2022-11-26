const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Dobi latency od Bota!",
    async execute({ client, inter }) {

        const m = await inter.reply("Ping?")
        inter.editReply(`Pong! API Latency je ${Math.round(client.ws.ping)}ms 🛰️, Racununao zadnje: ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })} ago`)

    },
};