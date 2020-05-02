import { Card, updateCardPosition, createCardDeck } from "./Utils/card";
import { CARD_GAP, CARD_WIDTH, CARD_HEIGHT } from "./constants";

export type State = {
  totalCard: number;
  cards: Card[];
  previousCard: Card | null;
  flipCount: number;
  moves: number;
};

export const initialState: State = {
  previousCard: null,
  totalCard: 32,
  flipCount: 0,
  moves: 0,
  cards: [],
};

export type Action = {
  type: string;
  payload?: any;
};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        cards: createCardDeck(state.totalCard, {
          gap: CARD_GAP,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
        }),
      };

    case "select":
      if (state.flipCount < 2) {
        const newState = { ...state };
        newState.cards[action.payload].flipped = true;
        newState.previousCard = newState.cards[action.payload];
        newState.flipCount += 1;
        newState.moves += 1;
        return newState;
      }

      return state;

    case "match":
      return {
        ...state,
        flipCount: 0,
        previousCard: null,
        cards: state.cards.map((card) => {
          return card.uuid === action.payload
            ? { ...card, matched: true }
            : card;
        }),
      };

    case "hide":
      return {
        ...state,
        flipCount: 0,
        previousCard: null,
        cards: state.cards.map((card) => {
          return !card.matched ? { ...card, flipped: false } : card;
        }),
      };

    case "updatePosition":
      return {
        ...state,
        cards: updateCardPosition(state.cards, {
          gap: CARD_GAP,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
        }),
      };
    default:
      return state;
  }
}
