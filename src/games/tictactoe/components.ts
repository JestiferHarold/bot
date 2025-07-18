import { Contact, Message, MessageMedia } from "whatsapp-web.js";
import { startTime, wwclient } from "../../../main";
import { board, changePlayer, chatId, currentPlayer, guesses, playerHasGussed, playerOne, playerTwo } from "./tictactoe";
import { Jimp } from "jimp";
import { MessageEvent } from "../../Events/messageevent";

type Pixel = { x: number; y: number };
type image = {imagePath: string, areaInBoard: Pixel}

export const BOARD_HEIGHT: number = 1104;
export const BOARD_WIDTH: number = 736;
export const CELL_HEIGHT: number = 170.6;
export const CELL_WIDTH: number = 170.6;

export enum TicTacToeCoins { //change the name
  NULL = ".",
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

export const WINNING_COMBOS = [
  [
    [0, 0], [0, 1], [0, 2]
  ],
  [
    [0, 0], [1, 0], [2, 0]
  ],
  [
    [0, 0], [1, 1], [2, 2]
  ],
  [
    [0, 1], [1, 1], [1, 2]
  ],
  [
    [0, 2], [1, 1], [2, 0]
  ],
  [
    [0, 2], [1, 2], [2, 2]
  ],
  [
    [1, 0], [1, 1], [1, 2]
  ],
  [
    [2, 0], [2, 1], [2, 2]
  ]
]

export const Game = async (message: Message) => {

  if (message.body == ",status") {
    return await message.reply(`\`\`\`Online\n\nUptime = ${Date.now() - startTime}\n\nCurrent Event = ${this}\`\`\``)
  }
 
  if (message.body == "quit" && (message.from == playerOne.contact.id._serialized || message.from == playerTwo.contact.id._serialized)) {
    wwclient.removeListener("message", Game)
    wwclient.addListener("message", MessageEvent)
    return await message.reply("Game Ended")
  }

  if ((await message.getChat()).id._serialized != chatId) {
    return
  }

  const contact: string = (await message.getContact()).id._serialized
  if (contact != playerOne.contact.id._serialized && contact != playerTwo.contact.id._serialized) {
    return
  }

  if (message.body.length > 1) {
    return
  } 

  if (!(/\d/.test(message.body))) {
    return
  }

  try {
    let guess = parseInt(message.body)
    if (guess < 1 || guess > 9) {
      return await message.react("a") //CROSS HERE
    }

    if (guess < 4) {
      if (board[0][guess - 1] == TicTacToeCoins.FULL_CROSS || board[0][guess - 1] == TicTacToeCoins.FULL_ZERO) {
        return await message.reply("Already filled, try a different box") 
      } else {
        board[0][guess - 1] = currentPlayer.coin
        changePlayer()
      }
    } else if (guess < 7) {
      if (board[1][guess - 3] == TicTacToeCoins.FULL_CROSS || board[1][guess - 3] == TicTacToeCoins.FULL_ZERO) {
        return await message.reply("Already filled, try a different box")
      } else {
        board[1][guess - 3] = currentPlayer.coin
        changePlayer()
      }
    } else if (guess < 10) {
      if (board[2][guess - 5] == TicTacToeCoins.FULL_CROSS || board[2][guess - 5] == TicTacToeCoins.FULL_ZERO) {
        return await message.reply("Already filled, try a different box")
      } else {
        board[2][guess - 5] = currentPlayer.coin
        changePlayer()
      } 
    } else {
      return
    }  
  } catch (err) {
    console.log(err)
  }

  playerHasGussed()

  if (guesses == 9) {
    return await wwclient.sendMessage(chatId, "Game ends in a draw")
  }

  if (guesses > 3) {
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        if (board[i][j] == TicTacToeCoins.NULL) {
          continue
        }
        
        await winner()
      }
    }
  }

  await wwclient.sendMessage(message.from, new MessageMedia("image/jpg", ((await draw(board)).split(",")[1])))
}

async function winner() {
  for (let select of WINNING_COMBOS) {
    if (board[select[0][0]][select[0][1]] == board[select[1][0]][select[1][1]]) {
      if (board[select[1][0]][select[1][1]] == board[select[2][0]][select[2][1]]) {
        // @ts-ignore
        // await wwclient.sendMessage(chatId , `@${}`)
      }
    }
  }
}

async function gameOver() {

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

      if (matrix[i][j]== "X") {
        let m = i + j + (i == 0 ? 1 : i == 1 ? 3 : 5)
        images.push(
          {
            imagePath: "src/games/tictactoe/images/cross.png",
            areaInBoard: Boxes[m]
          }
        )
        continue
      }

      if (matrix[i][j] == "O") {
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
