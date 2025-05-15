import { memo } from "react";

import Text from "../../atoms/Text";

import style from "./style.module.scss";

const ProductInfo = (props) => {
  const { index = 0, topic = "w/n", info = "w/n" } = props || {};

  const classs = index % 2 ? style.colored : "";

  return (
    <li className={classs}>
      <Text>{topic}</Text>
      <Text>{info}</Text>
    </li>
  );
};

export default memo(ProductInfo);
