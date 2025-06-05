import { Contact, Message, MessageMedia } from "whatsapp-web.js";
import { wwclient } from "../../../main";
import { MessageEvent } from "../../Events/messageevent";

let text: string | Array<string>;
let players: Array<{
  pushName: string;
  phoneNumber: string;
  _serialized: string;
  points?: number;
}> = new Array();
let chatId: string;
let media: MessageMedia;
let image: Message;
let timer: NodeJS.Timeout;
let finalAnswers: Array<{
  contactId: string; // serialized
  submission: string;
  timeStamp: number;
}> = new Array();

async function getpara() {
  let URL: string = "https://icanhazdadjoke.com/";

  let response = await fetch(URL, {
    headers: {
      Accept: "application/json",
    },
  });

  let responseJson = await response.json();

  if (responseJson == undefined) {
    return undefined;
  }

  text = responseJson.joke;

  URL += `j/${responseJson.id}.png`;

  return URL;
}

export async function memoryGame(message: Message) {
  let url: string | undefined = await getpara();

  if (url == undefined) {
    return;
  }

  media = await MessageMedia.fromUrl(url);

  chatId = (await message.getChat()).id._serialized;

  wwclient.removeListener("message", MessageEvent);
  wwclient.addListener("message", getPlayers);
  await wwclient.sendMessage(
    chatId,
    "Running game has started, type join to join the game"
  );

  setTimeout(async () => {
    wwclient.removeListener("message", getPlayers);
    await sendBody();
    // setTimeout(async () => {
    //   wwclient.removeListener("message", endGame);
    //   console.log(finalAnswers);
    // }, 30000);
  }, 30000);
}

export const getPlayers = async (message: Message) => {
  //have a timer

  console.log(players);

  if (!((await message.getChat()).id._serialized == chatId)) {
    return;
  }

  if (message.body.toLowerCase() == "quit") {
    wwclient.removeListener("message", getPlayers);
    wwclient.addListener("message", MessageEvent);
    return await message.react("asd");
  }

  if (message.body.toLowerCase() == "join") {
    let contact: Contact = await message.getContact();

    for (let player of players) {
      if (player._serialized == contact.id._serialized) {
        return;
      }
    }

    players.push({
      pushName: contact.pushname,
      phoneNumber: contact.number,
      _serialized: contact.id._serialized,
    });
    return;
  }

  if (message.body.toLowerCase() == "start") {
    // I forgot
  }
};

export const sendBody = async () => {
  if (players.length == 0) {
    await wwclient.sendMessage(chatId, "Quiting as 0 players enrolled");
    return wwclient.addListener("message", MessageEvent);
  }

  let caption: string = "```Players\n";

  for (let player of players) {
    caption += `\n${player.pushName} : ${player.phoneNumber}`;
  }

  caption += "```";

  await wwclient.sendMessage(chatId, media, {
    caption: caption,
  });
  wwclient.addListener("message", endGame);
};

export const endGame = async (message: Message) => {
  if (!message.body.toLowerCase().startsWith(",s")) {
    return;
  }

  let id: string = (await message.getContact()).id._serialized;

  for (let pass of finalAnswers) {
    if (pass.contactId == id) {
      return;
    }
  }

  finalAnswers.push({
    contactId: id,
    submission: message.body.split(" ").slice(1).join(" "),
    timeStamp: message.timestamp,
  });

  console.log(finalAnswers);
};

export const giveAName = async () => {
  //@ts-ignore
  text = text.split(" ");
  for (let player of finalAnswers) {
    let submission = player.submission.split(" ");
    
  }
};
