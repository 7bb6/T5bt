const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "volume",
    description: "Set or display music volume (0-200).",
    async execute(message, args, client) {
        const queue = client.distube.getQueue(message.guild.id);
        const embed = new EmbedBuilder().setColor(Colors.Blue);
        if (!queue) {
            embed.setDescription(client.localization.get("errors.noMusicPlaying"));
            return message.channel.send({ embeds: [embed] });
        }
        if (!args.length) {
            embed.setDescription(client.localization.get("commands.volume.current", { volume: queue.volume }));
            return message.channel.send({ embeds: [embed] });
        }
        const volume = Number.parseInt(args[0], 10);
        if (!Number.isInteger(volume) || volume < 0 || volume > 200) {
            embed.setDescription(client.localization.get("commands.volume.invalid"));
            return message.channel.send({ embeds: [embed] });
        }
        try {
            await queue.setVolume(volume);
            embed.setDescription(client.localization.get("commands.volume.set", { volume }));
            return message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error("Error executing volume command:", error);
            embed.setDescription(client.localization.get("errors.unknownError"));
            return message.channel.send({ embeds: [embed] });
        }
    },
};
