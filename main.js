const ffmpeg = require('ffmpeg-static');
const { Client, Intents } = require('discord.js');
const voiceDiscord = require(`@discordjs/voice`);
const { createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');

const client = new Client(
    { 
        intents:
        [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_VOICE_STATES
        ] 
    });

client.on('ready', () =>
{
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', async (OldVoiceState, NewVoiceState) =>
{
    const guild = client.guilds.cache.get('796767783354368030');
    const connection = voiceDiscord.joinVoiceChannel(
        {
            channelId: '959872637058842674',
            guildId: '796767783354368030',
            adapterCreator: guild.voiceAdapterCreator,
            selfDeaf: true,
        });
    const player = createAudioPlayer(
        {
            behaviors:
                {
                    noSubscriber: NoSubscriberBehavior.Pause,
                }
        });

    if (NewVoiceState.channel && NewVoiceState.member.user.id !== '743740869773099058')
    {
        const role = await NewVoiceState.guild.roles.cache.find((Role) => Role.name === '< Verified Member />');

        const resource = createAudioResource('./rulesVoice.m4a');

        player.play(resource);
        connection.subscribe(player);

        await NewVoiceState.member.roles.add(role);

        console.log(`Member: ${NewVoiceState.member.user.tag} connected to ${NewVoiceState.channel.name}.`);
    }
});

process.on("unhandledRejection", (reason, promise) =>
{
    try
    {
        console.error("Unhandled Rejection at: ", promise, "reason: ", reason.stack || reason);
    }
    catch
    {
        console.error(reason);
    }
});

client.login(process.env.token);
