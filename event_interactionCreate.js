const { InteractionType, EmbedBuilder, Colors } = require("discord.js");

const pauseButton = require("./button_pause");
const resumeButton = require("./button_resume");
const skipButton = require("./button_skip");
const stopButton = require("./button_stop");
const volumeUpButton = require("./button_volumeUp");
const volumeDownButton = require("./button_volumeDown");
const repeatButton = require("./button_repeat");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        try {
            if (interaction.type !== InteractionType.MessageComponent) return;

            if (!interaction.isButton()) return;

            const buttonHandlers = {
                pause: pauseButton,
                resume: resumeButton,
                skip: skipButton,
                stop: stopButton,
                volumeUp: volumeUpButton,
                volumeDown: volumeDownButton,
                repeat: repeatButton,
            };

            const handler = buttonHandlers[interaction.customId];
            if (handler) {
                await handler.execute(interaction, client);
            } else {
                const embed = new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription(client.localization.get('errors.unknownCommand'));
                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } catch (error) {
            console.error("❌ Error handling interaction:", error);
            if (interaction.replied || interaction.deferred) {
                interaction
                    .followUp({ content: client.localization.get('misc.unknownError'), ephemeral: true })
                    .catch(console.error);
            } else {
                interaction
                    .reply({ content: client.localization.get('misc.unknownError'), ephemeral: true })
                    .catch(console.error);
            }
        }
    },
};