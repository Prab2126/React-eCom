import { useState } from "react";

const useCount = (props) => {
  const { maxValue = 1, intiValue = 1, defaultValue = 0 } = props || {};
  const [count, setCount] = useState(defaultValue || intiValue);

  const handleOnPrevious = () => {
    setCount((e) => (e >= intiValue ? --e : intiValue));
  };
  const handleOnNext = () => {
    setCount((e) => (e <= maxValue ? ++e : maxValue));
  };

  return {
    count,
    handleOnPrevious,
    handleOnNext,
  };
};

export default useCount;
