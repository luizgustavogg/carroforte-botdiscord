import { Client, Events, GatewayIntentBits } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from '@discordjs/voice';
import dotenv from "dotenv";
import ffmpeg from 'fluent-ffmpeg';

dotenv.config();

// Definir o caminho do FFmpeg (substitua pelo caminho correto, se necessário)
ffmpeg.setFfmpegPath('C:\ffmpeg-master-latest-win64-gpl-shared\bin\ffmpeg.exe');  // Alterar o caminho conforme necessário

const VOICE_CHANNEL_ID = '1361344077274153236'; // coloque o ID do canal de voz
const TEXT_CHANNEL_ID = '1361344077274153235'; // canal de texto pra mandar msg

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once(Events.ClientReady, readyClient => {
    console.log(`Ta funcionando ${readyClient.user.tag}`);

    setInterval(() => {
        const agora = new Date();
        const horas = agora.getHours();
        const minutos = agora.getMinutes();

        if ((horas === 10 || horas === 15 || horas === 19 || horas === 23) && (minutos === 50 || minutos === 55)) {
            const textChannel = readyClient.channels.cache.get(TEXT_CHANNEL_ID);
            if (textChannel) {
                textChannel.send(`Faltam ${60 - minutos} minutos pro Carro Forte das ${horas + 1}:00! @everyone`);
            }
        }

        if ((horas === 11 || horas === 16 || horas === 20 || horas === 0) && minutos === 0) {
            const textChannel = readyClient.channels.cache.get(TEXT_CHANNEL_ID);
            if (textChannel) {
                textChannel.send(`Carro Forte das ${horas}:00 é agora! @everyone`);
            }
        }

    }, 60000); // checa a cada minuto
});

client.login(process.env.TOKEN);
