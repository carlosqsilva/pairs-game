import React, { useReducer, useCallback } from "react";

import { createParticles } from "./Shared/Particle";

import { useUpdateOnResize } from "./Hooks/useUpdateonResize";
import { StartButton } from "./Components/StartButton";
import { Card } from "./Components/Card";

import { reducer, initialState } from "./State";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

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
