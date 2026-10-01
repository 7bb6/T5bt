const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "help",
    description: "Show the music commands.",
    async execute(message, args, client) {
        const ar = client.config.language === "ar";
        const lines = ar ? [
            "**قائمة الأوامر:**",
            "`!ش` / `!p` / `!play` — تشغيل أغنية أو رابط",
            "`!توقف` / `!stop` — إيقاف التشغيل ومسح القائمة",
            "`!س` / `!skip` — تخطي الأغنية",
            "`!إيقاف` / `!pause` — إيقاف مؤقت",
            "`!استئناف` / `!resume` — استكمال التشغيل",
            "`!صوت 0-200` / `!volume 0-200` — ضبط الصوت، أو `!volume` لعرضه",
            "`!vup` — رفع الصوت 10%، و`!vdown` — خفضه 10%",
            "`!تكرار` / `!loop` — تبديل التكرار",
            "`!repeat song` — تكرار الأغنية، `!repeat queue` — تكرار القائمة",
            "`!لتكرر` / `!unloop` — إيقاف التكرار",
            "`!الاغنية` / `!np` — عرض الأغنية الحالية",
            "`!الاغاني` / `!q` — عرض قائمة الأغاني",
            "`!مسح` / `!clear` — مسح القائمة وإيقاف الموسيقى",
            "`!شيله رقم` / `!remove رقم` — حذف أغنية من القائمة",
            "`!مساعدة` / `!help` — عرض هذه القائمة"
        ] : [
            "**Commands List:**",
            "`!play <song>` / `!p` — play a song or URL",
            "`!stop` — stop playback and clear queue",
            "`!skip` / `!s` — skip current song",
            "`!pause` — pause playback",
            "`!resume` / `!r` — resume playback",
            "`!volume 0-200` / `!v` — set volume; `!volume` shows current volume",
            "`!vup` / `!vdown` — change volume by 10%",
            "`!repeat` / `!loop` — toggle repeat",
            "`!repeat song|queue|off` — choose repeat mode",
            "`!unloop` — turn repeat off",
            "`!nowplaying` / `!np` — show current song",
            "`!queue` / `!q` — show queue",
            "`!clear` — clear queue and stop music",
            "`!remove <number>` / `!rm` — remove a queued song",
            "`!help` — show this list"
        ];
        const embed = new EmbedBuilder()
            .setColor(Colors.Blue)
            .setTitle(ar ? "مساعدة مشغل الموسيقى" : "Music Player Help")
            .setDescription(lines.join("\\n"));
        return message.channel.send({ embeds: [embed] });
    },
};
