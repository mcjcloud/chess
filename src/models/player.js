// interface Player {
//   color: "b" | "w"
//   selectMove: (board: string[][], availableMoves: [src, dest][]) => [src: { x, y }, dest: { x, y }]
// }

export class HorriblePlayer {
  constructor(color) {
    this.color = color
  }

  selectMove(board, availableMoves) {
    return availableMoves[0]
  }
}

export class RandomPlayer {
  constructor(color) {
    this.color = color
  }

  async selectMove(board, availableMoves) {
    await new Promise((resolve) => setTimeout(resolve, 1000 * 0.5))
    const i = Math.floor(Math.random() * availableMoves.length)
    return availableMoves[i]
  }
}

export class GreedyPlayer {
  constructor(color) {
    this.color = color
  }

  async selectMove(board, availableMoves) {
    const pieceValues = {
      k: 6,
      q: 5,
      r: 4,
      b: 3,
      n: 2,
      p: 1,
    }

    let value = 0
    const i = Math.floor(Math.random() * availableMoves.length)
    let bestMove = availableMoves[i]

    for (let [src, dest] of availableMoves) {
      let square = board[dest.y][dest.x]
      if (square.startsWith(this.color === "w" ? "b" : "w")) {
        console.log({ availableMoves, dest, board, pieceValues })

        const piece = square.charAt(1)
        if (pieceValues[piece] > value) {
          value = pieceValues[square.charAt(1)]
          bestMove = [src, dest]
        }
      }
    }

    console.log({ bestMove })
    return bestMove
  }
}
