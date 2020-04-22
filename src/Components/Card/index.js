import React from "react";

import { cx } from "../../Utils/classnames";
import { CARD_WIDTH, CARD_HEIGHT } from "../../constants";
import s from "./card.module.css";

export function Card({ top, left, content, flipped, onClick }) {
  return (
    <div
      onClick={onClick}
      className={cx(s.card, { card: flipped })}
      style={{
        top,
        left,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
    >
      <div className={s.back}>{content}</div>
      <div className={s.front} />
    </div>
  );
}
