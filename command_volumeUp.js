const { EmbedBuilder, Colors } = require("discord.js");
module.exports = {
    name: "volumeUp",
    description: "Increase volume by 10%.",
    async execute(message, args, client) {
        const queue = client.distube.getQueue(message.guild.id);
        const embed = new EmbedBuilder().setColor(Colors.Blue);
        if (!queue) {
            embed.setDescription(client.localization.get("errors.noMusicPlaying"));
            return message.channel.send({ embeds: [embed] });
        }
        const volume = Math.min(200, queue.volume + 10);
        try {
            await queue.setVolume(volume);
            embed.setDescription(client.localization.get("commands.volume.set", { volume }));
            return message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            embed.setDescription(client.localization.get("errors.unknownError"));
            return message.channel.send({ embeds: [embed] });
        }
    },
};
