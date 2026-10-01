const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "repeat",
    description: "Toggle repeat mode or set song/queue/off.",
    async execute(message, args, client) {
        const queue = client.distube.getQueue(message.guild.id);
        const embed = new EmbedBuilder().setColor(Colors.Blue);
        if (!queue) {
            embed.setDescription(client.localization.get("errors.noMusicPlaying"));
            return message.channel.send({ embeds: [embed] });
        }
        const modeArg = (args[0] || "").toLowerCase();
        let mode;
        if (["off", "إيقاف", "وقف"].includes(modeArg)) mode = 0;
        else if (["song", "track", "أغنية", "الاغنية"].includes(modeArg)) mode = 1;
        else if (["queue", "قائمة", "الطابور"].includes(modeArg)) mode = 2;
        else mode = queue.repeatMode === 0 ? 1 : 0;
        try {
            await queue.setRepeatMode(mode);
            const key = mode === 0 ? "commands.repeat.repeatOff" : mode === 1 ? "commands.repeat.repeatSong" : "commands.repeat.repeatQueue";
            embed.setDescription(client.localization.get(key));
            return message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error("Error executing repeat command:", error);
            embed.setDescription(client.localization.get("errors.unknownError"));
            return message.channel.send({ embeds: [embed] });
        }
    },
};
