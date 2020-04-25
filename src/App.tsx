import React, { useReducer, useCallback } from "react";

import { CARD_HEIGHT, CARD_WIDTH, CARD_GAP } from "./constants";
import { createParticles } from "./Shared/Particle";
import {
  createCardDeck,
  updateCardPosition,
  Card as CardInterface,
} from "./Utils/card";

import { useUpdateOnResize } from "./Hooks/useUpdateonResize";
import { StartButton } from "./Components/StartButton";
import { Card } from "./Components/Card";

type State = {
  totalCard: number;
  cards: CardInterface[];
  previousCard: CardInterface | null;
  flipCount: number;
  moves: number;
};

const InitialState: State = {
  previousCard: null,
  totalCard: 32,
  flipCount: 0,
  moves: 0,
  cards: [],
};

type Action = {
  type: string;
  payload?: any;
};

function reducer(state: State, action: Action) {
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

function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  useUpdateOnResize(() => {
    if (state.cards.length > 0) dispatch({ type: "updatePosition" });
  }, [state]);

  const selectCard = useCallback(
    (index) => () => {
      const { previousCard, cards } = state;
      const card = cards[index];

      dispatch({ type: "select", payload: index });

      if (previousCard) {
        if (previousCard.uuid === card.uuid) {
          setTimeout(() => {
            dispatch({ type: "match", payload: card.uuid });

            createParticles(30, { x: previousCard.left, y: previousCard.top });
            createParticles(30, { x: card.left, y: card.top });
          }, 500);
        } else if (previousCard.uuid !== card.uuid) {
          setTimeout(() => dispatch({ type: "hide" }), 1000);
        }
      }
    },
    [state, dispatch]
  );

  return (
    <main style={{ minHeight: "100vh" }}>
      <section>
        <StartButton onClick={() => dispatch({ type: "start" })} />
      </section>

      <section style={{ position: "relative" }}>
        {state.cards.map((card, idx) => (
          <Card {...card} key={idx} onClick={selectCard(idx)} />
        ))}
      </section>
    </main>
  );
}

export default App;
