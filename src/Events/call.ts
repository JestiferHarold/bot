import { Call } from "whatsapp-web.js"
import { wwclient } from "../../main"

export const IncomingCallEvent = async (call: Call) => {
  console.log(call)
  if (call.fromMe || call.from?.split(":")[0] == process.env.PHONE_NUMBER) { //|| !(call.isVideo && call.isGroup)
    return 
  }

  const chat: string | undefined = call.from
  await call.reject()

  if (chat != undefined && !call.isGroup) {
    await wwclient.sendMessage(chat, `This is a bot made using WWebjs Library, any calls received will be rejected automatically. 
This ${process.env.PHONE_NUMBER}  is the phone number of the person you are trying to contact`);
  } 

  //@ts-ignore
  await wwclient.sendMessage(process.env.PHONE_NUMBER_SERIALIZED, `${(call.isVideo ? "Video" : "Audio")} Call from ${call.from} at ${call.timestamp}\n\nParticipants ${call.participants}`)
}
