import { memo, useEffect, useRef, useState } from "react";

import Button from "../../atoms/Button";

import style from "./style.module.scss";

const RealPageNation = (props) => {
  const {
    children = () => {},
    max_count = 2,
    min_count = 0,
    totalLength = 2,
    items = [],
  } = props || {};

  const { current } = useRef({
    max_count,
  });

  const [page, setPage] = useState({
    min_count,
    max_count,
    stateId: 0,
  });

  useEffect(() => {
    setPage({
      min_count,
      max_count,
      stateId: 0,
    });
  }, [items]);

  const newItems = items.slice(page.min_count, page.max_count);

  const handleOnClick = ({ target } = {}) => {
    const { id } = target.dataset;
    const idInNumber = Number(id);

    if (target.tagName === "BUTTON")
      setPage(() => ({
        min_count: idInNumber * current.max_count,
        max_count: (idInNumber + 1) * current.max_count,
        stateId: idInNumber,
      }));
  };

  const btnRender = (totalLength) => {
    const newArray = [];
    const { stateId } = page || {};

    if (totalLength) {
      for (let init = 0; init <= totalLength; init++) {
        const activePage = init == stateId ? "pageActive" : "";
        newArray.push(
          <Button
            key={init}
            id={init}
            className={`pageNation-style ${activePage}`}
          ></Button>
        );
      }

      return newArray.map((item) => item);
    }
  };
  return (
    <>
      {children(newItems)}
      <div onClick={handleOnClick} className={style.pageNation}>
        {btnRender(totalLength)}
      </div>
    </>
  );
};

export default memo(RealPageNation);
