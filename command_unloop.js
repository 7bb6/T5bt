const { EmbedBuilder, Colors } = require("discord.js");
module.exports = {
    name: "unloop",
    description: "Turn repeat mode off.",
    async execute(message, args, client) {
        const queue = client.distube.getQueue(message.guild.id);
        const embed = new EmbedBuilder().setColor(Colors.Blue);
        if (!queue) {
            embed.setDescription(client.localization.get("errors.noMusicPlaying"));
            return message.channel.send({ embeds: [embed] });
        }
        try {
            await queue.setRepeatMode(0);
            embed.setDescription(client.localization.get("commands.repeat.repeatOff"));
            return message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            embed.setDescription(client.localization.get("errors.unknownError"));
            return message.channel.send({ embeds: [embed] });
        }
    },
};
