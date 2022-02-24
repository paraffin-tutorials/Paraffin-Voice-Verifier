const Discord = require('discord.js-12');
const ffmpeg = require('ffmpeg-static');

const client = new Discord.Client();

client.on ('ready', async () =>
{
    await client.user.setActivity('Paraffin Guild', { type: 'WATCHING' });

    console.log(`Logged in ${ client.user.tag }`);
});

client.on('voiceStateUpdate', async (OldVoiceState, NewVoiceState) =>
{
    if (NewVoiceState.channel)
    {
        if (NewVoiceState.channel.id === '840294590770184263')
        {
            const channel = client.channels.cache.get('840294590770184263');
            const role = await NewVoiceState.guild.roles.cache.find((Role) => Role.name === '< Verified Member />');

            const connection = await channel.join();

            connection.play('./rulesVoice.m4a');

            await NewVoiceState.member.roles.add(role);

            console.log(`Member: ${ NewVoiceState.member.user.tag } connected to ${ NewVoiceState.channel.name }.`);
        }
    }
    else if (OldVoiceState.channel)
    {
        if (OldVoiceState.channel.id === '840294590770184263')
        {
            await OldVoiceState.channel.leave();

            console.log(`Rules Voice: ${ OldVoiceState.member.user.tag } disconnected to ${ OldVoiceState.channel.name }.`);

            console.log(`Bot: I left the ${ OldVoiceState.channel.name }ٰ.`);
        }
    }
});

process.on('unhandledRejection', (reason, promise) =>
{
    try
    {
        console.error('Unhandled Rejection at: ', promise, 'reason: ', reason.stack || reason);
    }
    catch
    {
        console.error(reason);
    }
});

client.login(process.env.token);
