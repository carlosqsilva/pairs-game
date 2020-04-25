import { shuffleArray } from "./shuffle";

interface CardPosition {
  top: number;
  left: number;
}

export interface Card extends CardPosition {
  uuid: symbol;
  flipped: boolean;
  matched: boolean;
  content: any;
  onClick?: () => void;
}

interface CardPositionInfo {
  width: number;
  height: number;
  gap: number;
  yOffset?: number;
}

export function updateCardPosition(cards: Card[], info: CardPositionInfo) {
  const total = cards.length;

  const positions = calculateNPositions(total, info);

  return cards.map((card, idx) => ({ ...card, ...positions[idx] }));
}

export function calculateNPositions(
  total: number,
  { width, height, gap, yOffset = 0 }: CardPositionInfo
): CardPosition[] {
  const columnCount = Math.floor(window.innerWidth / (width + gap));
  const rowsCount = Math.ceil(total / columnCount);

  const xOffset = (window.innerWidth % (width + gap)) / 2;

  return (function (total: number) {
    const positions = [];
    for (let y = 0; y < rowsCount; y++) {
      for (let x = 0; x < columnCount; x++) {
        const _gap = x === 0 && y === 0 ? 0 : gap;
        const index = y * columnCount + x + 1;

        positions.push({
          top: y * (height + _gap) + yOffset,
          left: x * (width + _gap) + xOffset,
        });

        if (index === total) {
          return positions;
        }
      }
    }
  })(total) as CardPosition[];
}

export function createCardDeck(
  total: number,
  { gap, width, height }: CardPositionInfo
): Card[] {
  const pos = calculateNPositions(total, {
    gap,
    width,
    height,
  });

  const cards = [];

  for (let i = 0; i < total / 2; i++) {
    const index = i * 2;

    const card = {
      uuid: Symbol.for(String(index)),
      flipped: false,
      matched: false,
      content: i,
    };

    cards.push({ ...card, ...pos[index] });
    cards.push({ ...card, ...pos[index + 1] });
  }

  return shuffleArray(cards);
}
