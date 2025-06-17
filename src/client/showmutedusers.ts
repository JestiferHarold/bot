import { Chat, Message } from "whatsapp-web.js";
import { Groups } from "../../main";

export async function showMutedUsers(message: Message) {
  const chat: Chat = await message.getChat()

  if (!chat.isGroup) {
    return
  }

  for (let group of Groups) {
    if (group.chat_serialized == chat.id._serialized) {
      return await message.reply(`Blocked Users: ${group.blockedUsers.join("  ")}`)
    }
  }
}
