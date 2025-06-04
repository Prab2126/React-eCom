import { memo } from "react";

import Text from "../../atoms/Text";

import style from "./style.module.scss";

const ProductInfo = (props) => {
  const { index = 0, topic = "w/n", info = "w/n" } = props || {};

  const classs = index % 2 ? style.even : style.odd;

  return (
    <li className={`${classs}`}>
      <Text variant="h4">{topic}</Text>
      <Text>{info}</Text>
    </li>
  );
};

export default memo(ProductInfo);
