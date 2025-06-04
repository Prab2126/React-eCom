import { useEffect, useState } from "react";

const useCount = (props) => {
  const { maxValue = 1, minVal = 1, defaultValue = 0 } = props || {};
  const [count, setCount] = useState(defaultValue);

  useEffect(() => {
    setCount(defaultValue);
  }, [defaultValue]);

  const handleOnPrevious = () => {
    setCount((e) => (e >= minVal ? --e : minVal));
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
