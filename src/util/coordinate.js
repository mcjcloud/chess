const columns = ["a", "b", "c", "d", "e", "f", "g", "h"]
const rows = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse()

// TODO: promotion is broken
// TODO: detect ambiguity with N/R and promoted B/Q
export function notationForMove(src, dest, piece, takes, promotion) {
  const p = promotion ? "P" : piece.charAt(1).toUpperCase()
  const startSquare = `${columns[src.x]}${rows[src.y]}`
  const destSquare = `${columns[dest.x]}${rows[dest.y]}`
  
  let notation = ""
  // pawns do not need to be specified
  if (p !== "P") {
    notation += p
  }

  // pawns, bishops, queens, and kings will never have an ambiguous src square
  if (p === "N" || p === "R") {
    notation += startSquare
  }
  // unless a pawn is taking, then put just the column
  if (p === "P" && takes) {
    notation += startSquare.charAt(0)
  }

  // put an "x" if the piece is taking
  if (takes) {
    notation += "x"
  }

  // always append dest
  notation += destSquare

  // denote the promotion piece
  if (promotion) {
    notation += piece.charAt(1).toUpperCase()
  }

  return notation
}
