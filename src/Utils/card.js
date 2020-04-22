import { nanoid } from "nanoid";

export function calculateNPositions(
  total,
  { width, height, gap, yOffset = 0 }
) {
  const columnCount = Math.floor(window.innerWidth / (width + gap));
  const rowsCount = Math.ceil(total / columnCount);

  const xOffset = (window.innerWidth % (width + gap)) / 2;

  return (function (total) {
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
  })(total);
}

export function createCardDeck(total, { gap, width, height }) {
  const pos = calculateNPositions(total, {
    gap,
    width,
    height,
  });

  const cards = [];

  for (let i = 0; i < total / 2; i++) {
    const index = i * 2;

    const card = {
      uuid: nanoid(),
      flipped: false,
      content: i,
    };

    cards.push({ ...card, ...pos[index] });
    cards.push({ ...card, ...pos[index + 1] });
  }

  return cards;
}

// taken from here:
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  const arr = array.slice(0);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
