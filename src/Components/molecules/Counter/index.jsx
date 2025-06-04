import { memo } from "react";

import Button from "../../atoms/Button";

import useCount from "../../../Hooks/useCount";

const Counter = (props) => {
  const {
    maxValue = 1,
    prevSym = "-",
    nextSym = "+",
    minVal = 1,
    className = "",
    defaultValue = 0,
    children = () => {},
  } = props || {};

  const { count, handleOnPrevious, handleOnNext } = useCount({
    maxValue,
    minVal,
    defaultValue,
  });

  const stop_Previous_Btn = count == minVal;
  const stop_Next_Btn = count >= maxValue;
  const notLeftVisible =
    stop_Previous_Btn && prevSym !== "-" ? "notVisible" : "";
  const notRightVisible = stop_Next_Btn && nextSym !== "+" ? "notVisible" : "";

  return (
    <div className={className}>
      <Button
        className={notLeftVisible}
        disabled={stop_Previous_Btn}
        onClick={handleOnPrevious}
      >
        {prevSym}
      </Button>
      {children(count)}
      <Button
        className={notRightVisible}
        disabled={stop_Next_Btn}
        onClick={handleOnNext}
      >
        {nextSym}
      </Button>
    </div>
  );
};

export default memo(Counter);
