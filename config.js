module.exports = {
    app: {
        token: 'MTAzNjYwNTg2ODc4OTIxMTE2Ng.GPjvng.CPATkPuIeBmZfp2mBK8hBQ9tZc1wVO4CBXQlbI',
        playing: 'by xF1ame ❤️',
        global: true,
        guild: '1014146220551327754'
    },

    opt: {
        DJ: {
            enabled: false,
            roleName: '',
            commands: []
        },
        maxVol: 100,
        leaveOnEnd: true,
        loopMessage: false,
        spotifyBridge: true,
        defaultvolume: 75,
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    }
};