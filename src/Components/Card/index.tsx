import React, { useRef, useCallback, useEffect, useState } from "react";

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
  const eventProps = useTiltContainer();

  return (
    <div
      {...eventProps}
      className={cx("wrapper", { matched, flipped })}
      style={{
        top,
        left,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
      }}
    >
      <div onClick={onClick} className={cx("card", { flipped })}>
        <div className="front" />
        <div className="back">{content}</div>
      </div>
    </div>
  );
}

type MouseEvent = React.MouseEvent<HTMLElement>;

function useTiltContainer() {
  const [node, getNode] = useState<HTMLDivElement | null>(null);
  let { current: counter } = useRef(0);

  const isTimeToUpdate = () => counter++ % 10 === 0;

  let { current: origin } = useRef({ x: 0, y: 0 });

  const updatePosition = useCallback(
    (e: MouseEvent) => {
      const innerElement = e.currentTarget.firstElementChild;
      // innerElement.
      const { offsetHeight, offsetWidth } = e.currentTarget;
      const mouseX = e.clientX - origin.x;
      const mouseY = (e.clientY - origin.y) * -1;

      const x = (mouseY / offsetHeight / 2).toFixed(2);
      const y = (mouseX / offsetWidth / 2).toFixed(2);

      if (innerElement) {
        // @ts-ignore
        innerElement.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
      }
    },
    [node]
  );

  useEffect(() => {
    if (node) {
      origin.x = node.offsetLeft + Math.floor(node.offsetWidth / 2);
      origin.y = node.offsetTop + Math.floor(node.offsetHeight / 2);
    }
  });

  return {
    ref: getNode,
    onMouseEnter: (e: MouseEvent) => updatePosition(e),
    onMouseLeave: (e: MouseEvent) =>
      // @ts-ignore
      (e.currentTarget.firstElementChild.style.transform = ""),
    onMouseMove: (e: MouseEvent) => isTimeToUpdate() && updatePosition(e),
  };
}
