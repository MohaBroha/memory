/** Represents a card in the memory game board. */
export interface Card {
  id: string;
  pairId: string;
  asset: string;
  isFlipped: boolean;
  isMatched: boolean;
}
