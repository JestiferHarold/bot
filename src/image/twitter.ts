import { Message, MessageMedia } from "whatsapp-web.js";
import FfmpegCommand from "fluent-ffmpeg"
import stream from "stream"
import streamWeb from "stream/web"

export async function getVideo(message: Message) {
  let links = message.links;

  if (links.length == 0) {
    return;
  }

  if (links[0].isSuspicious) {
    return;
  }

  w
  //Save the file first and then bring it up buddy, no need to do all these mental gynmastics
  // const FFMPEG = FfmpegCommand(stream.Readable.fromWeb(streamWeb.ReadableStream.))

}
