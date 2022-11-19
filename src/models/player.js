// interface Player {
//   color: "b" | "w"
//   selectMove: (board: string[][], availableMoves: [src, dest][]) => [src: { x, y }, dest: { x, y }]
// }

export class HorriblePlayer {
  constructor(color) {
    this.color = color
  }

  selectMove(board, availableMoves) {
    return availableMoves[0];
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
