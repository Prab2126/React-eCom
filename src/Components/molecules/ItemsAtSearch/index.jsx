import { memo } from "react";

import Text from "../../atoms/Text";
import Image from "../../atoms/Image";
import Links from "../../atoms/Links";
import Button from "../../atoms/Button";

import filterByCategory from "../../../Utils/filterByCategory";

import style from "./style.module.scss";

const ItemsAtSearch = (props) => {
  const { title = "", src = null, category = "", id = 0 } = props || {};
  const presentRoute = filterByCategory(category, null, "route");
  const pathUrl = `/category/${presentRoute}/details/${id}`;

  return (
    <Button className={"searchedCard"} parentStyle={style}>
      <Links className={"redirctLink"} url={pathUrl} parentStyle={style}>
        <Image height="41px" width="41px" src={src} />
        <Text>{title}</Text>
      </Links>
    </Button>
  );
};

export default memo(ItemsAtSearch);
