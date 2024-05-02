require('dotenv').config();
const clientId = process.env.USER_ID;
const keep_alive = require('./keep_alive.js');
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc'});

DiscordRPC.register(clientId);

async function setActivity() {
    if (!RPC) return;
    RPC.setActivity({
        details: `Testing presence`,
        state: `Playing with RPC`,
        startTimestamp: Date.now(),
        largeImageKey: '18jfiprg',
        largeImageText: `Discord Icon`,
        smallImageKey: '18jfiprg',
        smallImageText: `Small Icon`,
        instance: false,
        buttons: [
            {
                label: `Testing Button`,
                url: `https://www.google.com`
            }
        ]
    });
};

RPC.on('ready', async () => {
    setActivity();

    setInterval(() => {
        setActivity();
    }, 15 * 1000);
});

RPC.login({ clientId }).catch(console.error);