import React from "react";

import { CARD_WIDTH, CARD_HEIGHT } from "../../constants";
import { Card as CardInterface } from "../../Utils/card";
import { cx } from "../../Utils/classnames";
import "./card.css";

export function Card({
  top,
  left,
  content,
  flipped,
  matched,
  onClick,
}: CardInterface) {
  return (
    <div
      onClick={onClick}
      className={cx("card", { flipped, matched })}
      style={{
        top,
        left,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
    >
      <div className="back">{content}</div>
      <div className="front" />
    </div>
  );
}
