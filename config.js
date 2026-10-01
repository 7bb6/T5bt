/*
██╗    ██╗██╗ ██████╗██╗  ██╗    ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ 
██║    ██║██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
██║ █╗ ██║██║██║     █████╔╝     ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
██║███╗██║██║██║     ██╔═██╗     ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║
╚███╔███╔╝██║╚██████╗██║  ██╗    ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
 ╚══╝╚══╝ ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ 
Copyright (c) 2024 Wick Studio
*/

module.exports = {    
    token: process.env.DISCORD_TOKEN, // Set in Wispbyte Environment Variables
    clientId: process.env.CLIENT_ID, // Set in Wispbyte Environment Variables
    prefix: "!", // prefix
    language: "ar", // ar for arabic | en for english
    verbose: true,
    musicCardPath: "./musicard.png",
    enableLogging: true,
    djRoleName: "Wick",
    aliases: {
      play: ["p", "start", "playmusic", "ش", "شغل", "تشغيل"],
      pause: ["hold", "stopmusic", "إيقاف"],
      resume: ["r", "continue", "استئناف", "متابعة"],
      skip: ["s", "next", "jump", "س", "سكب"],
      stop: ["end", "terminate", "توقف", "توقيف", "ت"],
      volume: ["v", "ص", "صوت"],
      volumeUp: ["vup", "increasevolume"],
      volumeDown: ["vdown", "decreasevolume"],
      repeat: ["loop", "تكرار"],
      unloop: ["لتكرر", "unloop"],
      queue: ["q", "الاغاني"],
      nowplaying: ["np", "الاغنية", "current"],
      clear: ["c", "مسح"],
      remove: ["rm", "delete", "شيله"],
      help: ["مساعدة", "أوامر", "اوامر"]
  }
};