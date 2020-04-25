import React from "react";
import { cx } from "../../Utils/classnames";
import "./style.css";

interface Props extends React.ComponentPropsWithoutRef<"button"> {}

export function StartButton({ disabled, ...props }: Props) {
  return (
    <button {...props} className={cx("start_button", { disabled })}>
      INICIAR
    </button>
  );
}
