import React, { useState, useReducer, useEffect, useCallback } from "react";

import { Card } from "./Components/Card";

import { CARD_HEIGHT, CARD_WIDTH, CARD_GAP } from "./constants";
import { createCardDeck } from "./Utils/card";

const CARDS = 32;

const InitialState = { cards: [], previousCard: null, flipCount: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        cards: createCardDeck(action.payload, {
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
        return newState;
      }

      return state;

    case "match":
      return {
        ...state,
        flipCount: 0,
        previousCard: null,
        cards: state.cards.map((card) => {
          return card.uuid === payload ? { ...card, matched: true } : card;
        }),
      };

    case "hide":
      return {
        ...state,
        flipCount: 0,
        previousCard: null,
        cards: state.cards.map((card) => {
          return card.uuid === payload ? { ...card, flipped: false } : card;
        }),
      };

    default:
      return InitialState;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const selectCard = useCallback(
    (cardIdx) => () => {
      const { previousCard, cards } = state;
      const card = cards[cardIdx];

      if (!previousCard) {
        dispatch({ type: "select", payload: card.uuid });
      } else if (previousCard && previousCard.uuid === card.uuid) {
        dispatch({ type: "select", payload: card.uuid });

        setTimeout(() => dispatch({ type: "match", payload: card.uuid }), 500);
      } else if (previousCard && previousCard.uuid !== card.uuid) {
        dispatch({ type: "select", payload: card.uuid });

        setTimeout(() => dispatch({ type: "hide", payload: card.uuid }), 100);
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
          <Card {...card} key={idx} onClick={selectCard(idx)} />
        ))}
      </div>
    </div>
  );
}

export default App;
