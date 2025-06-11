import { Contact, Message } from "whatsapp-web.js";
import { startTime, wwclient } from "../../../main";
import { chatId, guesses, playerOne, playerTwo } from "./tictactoe";
import { Jimp } from "jimp";
import { MessageEvent } from "../../Events/messageevent";

type Pixel = { x: number; y: number };
type image = {imagePath: string, areaInBoard: Pixel}

export const BOARD_HEIGHT: number = 1104;
export const BOARD_WIDTH: number = 736;
export const CELL_HEIGHT: number = 170.6;
export const CELL_WIDTH: number = 170.6;

export enum TicTacToeCoins { //change the name
  FULL_CROSS = "X",
  FULL_ZERO = "O"
}

export interface TicTacToeGame {
  Players: Array< TTTPlayer >
}

export interface TTTPlayer {
  contact: Contact
  coin: TicTacToeCoins
}

export const Boxes: Record<number, Pixel> = {
  1: { x: 112, y: 376 },
  2: { x: 282, y: 376 },
  3: { x: 453, y: 476 },
  4: { x: 72, y: 431 },
  5: { x: 282, y: 546 },
  6: { x: 453, y: 546 },
  7: { x: 112, y: 717 },
  8: { x: 282, y: 717 },
  9: { x: 453, y: 717 },
};

export const Game = async (message: Message) => {

  if (message.body == ",status") {
    return await message.reply(`\`\`\`Online\n\nUptime = ${Date.now() - startTime}\n\nCurrent Event = ${this}\`\`\``)
  }
 
  if (message.body.toLowerCase() == "quit") {
    wwclient.removeListener("message", Game)
    wwclient.addListener("message", MessageEvent)
  }

  if ((await message.getChat()).id._serialized != chatId) {
    return
  }

  const contact: string = (await message.getContact()).id._serialized
  if (contact != playerOne && contact != playerTwo) {
    return
  }


}

export async function draw(matrix: string[][]) {
  const board = await Jimp.read("src/games/tictactoe/images/board 3.jpg");
  board.resize(
    {
      h: BOARD_HEIGHT,
      w: BOARD_WIDTH
    }
  )
  let images: Array<image> = new Array()

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j ++) {
      if (matrix[i][j] == ".") {
        continue
      }

      if (matrix[i][j].toLowerCase() == "x") {
        let m = i + j + (i == 0 ? 1 : i == 1 ? 3 : 5)
        images.push(
          {
            imagePath: "src/games/tictactoe/images/cross.png",
            areaInBoard: Boxes[m]
          }
        )
        continue
      }

      if (matrix[i][j].toLowerCase() == "o") {
        let m = i + j + (i == 0 ? 1 : i == 1 ? 3 : 5)
        images.push(
          {
            imagePath: "src/games/tictactoe/images/circle.png",
            areaInBoard: Boxes[m]
          }
        )
      }
    }
  }

  for (let img of images) {
    let player = await Jimp.read(img.imagePath)
    player.resize(
      {
        w: CELL_WIDTH,
        h: CELL_HEIGHT
      }
    )
    board.composite(player, img.areaInBoard.x, img.areaInBoard.y)
  }

  return await board.getBase64("image/jpeg")
}
