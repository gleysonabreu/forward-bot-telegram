import { env } from './env';
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import { NewMessage } from "telegram/events";
import { reconstructHtmlFromMessage } from "./utils/reconstruct-html-from-message";
import readlineSync from "readline-sync";


const apiId = env.APP_TL_API_ID;
const apiHash = env.APP_TL_API_HASH;
const stringSession = new StringSession(env.APP_SESSION_STRING_TL);

const originChatId = env.APP_TL_ORIGIN_CHAT_ID;
const destinationChatId = env.APP_TL_DESTINATION_CHAT_ID;

(async () => {
    console.log("🟡 Starting Telegram client...");
  
    const client = new TelegramClient(stringSession, apiId, apiHash, {
      connectionRetries: 5,
    });
  
    await client.start({
      phoneNumber: async () => readlineSync.question("📱 Phone number (ex: +55...): "),
      password: async () => readlineSync.question("🔐 Password 2FA (if you have): "),
      phoneCode: async () => readlineSync.question("📨 Code that arrived on Telegram: "),
      onError: (err) => console.error("❌ Error:", err),
    });


    await client.getDialogs();
    console.log("✅ Logged in successfully!");
  
    client.addEventHandler(
      async (event) => {
        const message = event.message;
        if (!message || !message.message) return;

        try {
            const msgText = message.message;
            const msgEntities = message.entities ?? [];
            const htmlFormatado = reconstructHtmlFromMessage(msgText, msgEntities);
            
            await client.sendMessage(destinationChatId, {
              message: htmlFormatado,
              parseMode: "html",
            });
          console.log("➡️ Message sent successfully");
        } catch (err) {
          console.error("❌ Error sending message:", err);
        }
      },
      new NewMessage({ chats: [originChatId] })
    );
  })();