import { Client, Events, GatewayIntentBits } from 'discord.js';
import dotenv from "dotenv";

const agora = new Date();
const horas = agora.getHours().toString().padStart(2, '0');
const minutos = agora.getMinutes().toString().padStart(2, '0');
const segundos = agora.getSeconds().toString().padStart(2, '0');

dotenv.config();

// Pega o horário atual
const now = new Date();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ta funcionando ${readyClient.user.tag}`);
});

client.login(process.env.TOKEN);


client.on("messageCreate", (msg) => {
    if (msg.content == "opa") {
        msg.reply({
            content: "Ta funcionando",
        });
    }
});

client.once(Events.ClientReady, readyClient => {
    setInterval(() => {
        const agora = new Date();
        const horas = agora.getHours().toString().padStart(2, '0');
        const minutos = agora.getMinutes().toString().padStart(2, '0');


        if ((horas == 10 || horas == 15 || horas == 19 || horas == 23) && (minutos == 50 || minutos == 55)) {
            const channel = readyClient.channels.cache.get("1361344077274153235")

            if (channel) {
                channel.send(`Faltam ${60 - minutos} minutos pro Carro Forte das ${horas+1}:00! @everyone`)
            }
        }

        if ((horas == 11 || horas == 16 || horas == 20 || horas == 0) && (minutos == 0)) {
            const channel = readyClient.channels.cache.get("1361344077274153235")

            if (channel) {
                channel.send(`Carro Forte das ${horas}:00 e agora! @everyone`)
            }
        }

    }, 30000)
});