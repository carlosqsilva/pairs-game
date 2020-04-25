export function shuffleArray(array: any[]) {
  const arr = array.slice(0),
    lastIndex = array.length - 1;

  for (let i = lastIndex; i > 0; i--) {
    const rand = baseRandom(i, lastIndex),
      value = arr[rand];

    arr[rand] = arr[i];
    arr[i] = value;
  }

  return arr;
}

function baseRandom(lower: number, upper: number) {
  return lower + Math.floor(Math.random() * (upper - lower + 1));
}
