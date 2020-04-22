import React, { useState, useReducer, useEffect, useCallback } from "react";

import { Card } from "./Components/Card";

import { CARD_HEIGHT, CARD_WIDTH, CARD_GAP } from "./constants";
import { createCardDeck } from "./Utils/card";

const CARDS = 32;

const InitialState = { cards: [], previousCard: null, hasMatch: false };

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        cards: createCardDeck(action.payload, {
          gap: CARD_GAP,
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
        }),
      };
    case "select":
      const newState = { ...state };

      const card = newState.cards[action.payload];

      if (!newState.previousSelection && !card.flipped) {
        card.flipped = true;
        newState.previousSelection = card.uuid;
      } else if (newState.previousSelection === card.uuid) {
        card.flipped = true;
        newState.hasMatch = true;
      }

      newState.cards[action.payload] = card;

      return newState;
    default:
      return InitialState;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const selectCard = useCallback(
    (cardIdx) => {
      const card = state.cards[cardIdx];

      if (!previousCard) {
        dispatch({ type: "select", payload: cardIdx });
      } else if (card.uuid === previousCard.uuid) {
        dispatch({ type: "select", payload: cardIdx });

        setTimeout(() => {
          dispatch({ type: "match", payload: card.uuid });
        }, 500);
      } else {
      }
    },
    [state, dispatch]
  );

  return (
    <div style={{ minHeight: "100vh" }}>
      <div>
        <button onClick={() => dispatch({ type: "start", payload: CARDS })}>
          Start
        </button>
      </div>

      <div style={{ position: "relative" }}>
        {state.cards.map((card, idx) => (
          <Card
            {...card}
            key={idx}
            onClick={() => dispatch({ type: "select", payload: idx })}
          />
        ))}
      </div>
    </div>
  );
}

export default App;