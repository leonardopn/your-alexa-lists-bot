import TelegramBot from "node-telegram-bot-api";
import { mountOauthUrl } from "../../utils/Alexa";

export function startBot() {
    const token = process.env.TELEGRAM_BOT_TOKEN as string;

    const bot = new TelegramBot(token, { polling: true });

    bot.on("message", (msg) => {
        bot.sendMessage(msg.chat.id, mountOauthUrl());
    });
}
