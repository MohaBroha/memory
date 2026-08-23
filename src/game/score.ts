import type { Player, PlayerScore } from "../types/game.types";

export function createInitialScores(): PlayerScore[] {
  return [
    {
      player: 1,
      points: 0,
    },
    {
      player: 2,
      points: 0,
    },
  ];
}

export function addPoint(scores: PlayerScore[], player: Player): PlayerScore[] {
  return scores.map((score) =>
    score.player === player ? { ...score, points: score.points + 1 } : score,
  );
}

export function getWinner(scores: PlayerScore[]): Player | null {
  if (scores[0].points === scores[1].points) {
    return null;
  }

  return scores[0].points > scores[1].points
    ? scores[0].player
    : scores[1].player;
}
