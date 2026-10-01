const { Client, Collection, GatewayIntentBits, Partials, Colors, EmbedBuilder, ActivityType } = require("discord.js");
const { DisTube } = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const path = require("path");
const fs = require("fs");
const { registerCustomFonts } = require("./util_registerFonts");
const config = require("./config");
const sodium = require('libsodium-wrappers');
const Localization = require("./util_localization");

if (!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
    console.error("❌ Missing environment variables: set DISCORD_TOKEN and CLIENT_ID in Wispbyte Variables.");
    process.exit(1);
}

(async () => {
    try {
        await sodium.ready;

        registerCustomFonts();

        const client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
            partials: [Partials.Channel],
        });

        client.config = config;

        client.localization = new Localization(client);

        client.commands = new Collection();

        const commandFiles = fs.readdirSync(__dirname).filter(file => file.startsWith("command_") && file.endsWith(".js"));

        for (const file of commandFiles) {
            const filePath = path.join(__dirname, file);
            const command = require(filePath);
            if ("name" in command && "execute" in command) {
                client.commands.set(command.name, command);
                console.log(`✅ Loaded command: ${command.name}`);

                const aliases = config.aliases[command.name];
                if (aliases && Array.isArray(aliases)) {
                    aliases.forEach(alias => {
                        client.commands.set(alias, command);
                        console.log(`✅ Registered alias '${alias}' for command '${command.name}'`);
                    });
                }
            } else {
                console.warn(`[WARNING] The command at ${filePath} is missing a required "name" or "execute" property.`);
            }
        }

        const eventFiles = fs.readdirSync(__dirname).filter(file => file.startsWith("event_") && !file.startsWith("event_distube_") && file.endsWith(".js"));

        for (const file of eventFiles) {
            const filePath = path.join(__dirname, file);
            const event = require(filePath);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
                console.log(`📂 Loaded event (once): ${event.name} from ${filePath}`);
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
                console.log(`📂 Loaded event: ${event.name} from ${filePath}`);
            }
        }

        client.distube = new DisTube(client, {
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            plugins: [
                new SoundCloudPlugin(),
                new YtDlpPlugin(),
            ],
            emitAddListWhenCreatingQueue: false,
        });

        client.distube
            .on("playSong", async (queue, song) => {
                try {
                    if (!queue.textChannel && song.metadata && song.metadata.message && song.metadata.message.channel) {
                        queue.textChannel = song.metadata.message.channel;
                    }

                    if (client.config.enableLogging) {
                        console.log(client.localization.get('events.playSong', { song: song.name, user: song.user.tag }));
                    }

                    if (queue.currentMessage) {
                        await queue.currentMessage.delete().catch((err) => {
                            if (client.config.enableLogging) console.error("❌ Error deleting previous message:", err);
                        });
                        queue.currentMessage = undefined;
                        queue.initiatorId = undefined;
                    }

                    await require("./util_sendMusicCard")(queue, song, client.localization);
                } catch (error) {
                    console.error("❌ Error in playSong event:", error);
                }
            })
            .on("addSong", (queue, song) => {
                try {
                    if (!queue.textChannel && song.metadata && song.metadata.message && song.metadata.message.channel) {
                        queue.textChannel = song.metadata.message.channel;
                    }

                    if (client.config.enableLogging) {
                        console.log(client.localization.get('events.addSong', { song: song.name, duration: formatTime(song.duration), user: song.user.tag }));
                    }

                    if (queue.textChannel && typeof queue.textChannel.send === "function") {
                        const embed = new EmbedBuilder()
                            .setColor(Colors.Blue)
                            .setDescription(client.localization.get('events.addSong', { song: song.name, duration: formatTime(song.duration), user: song.user.tag }));

                        queue.textChannel.send({ embeds: [embed] }).catch(console.error);
                    } else {
                        console.error("❌ AddSong event queue text channel is not text-based.");
                    }
                } catch (error) {
                    console.error("❌ Error in addSong event:", error);
                }
            })
        await client.login(client.config.token);
        console.log("🚀 Bot is online!");
    } catch (error) {
        console.error("❌ Failed to initialize the bot:", error);
        process.exit(1);
    }
})();

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

process.on('uncaughtException', error => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled Rejection:', error);
});