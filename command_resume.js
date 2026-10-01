const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "resume",
    description: "Resume paused music.",
    async execute(message, args, client) {
        const queue = client.distube.getQueue(message.guild.id);
        const embed = new EmbedBuilder().setColor(Colors.Blue);
        if (!queue) {
            embed.setDescription(client.localization.get("errors.noMusicPlaying"));
            return message.channel.send({ embeds: [embed] });
        }
        if (!queue.paused) {
            embed.setDescription(client.localization.get("commands.resume.notPaused"));
            return message.channel.send({ embeds: [embed] });
        }
        try {
            queue.resume();
            embed.setDescription(client.localization.get("commands.resume.resumed"));
            return message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error("Error executing resume command:", error);
            embed.setDescription(client.localization.get("errors.cannotResume"));
            return message.channel.send({ embeds: [embed] });
        }
    },
};
