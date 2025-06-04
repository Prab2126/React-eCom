import { memo } from "react";

import Text from "../../atoms/Text";
import Image from "../../atoms/Image";
import Links from "../../atoms/Links";
import Rating from "../../molecules/Rating";

import priceStructure from "../../../Utils/priceStructure";

import style from "./style.module.scss";
const TopRated = (props) => {
  const {
    img = "",
    pathUrl = "",
    title = "title",
    price = 0,
    star = 1,
  } = props || {};

  const discountPrice = priceStructure(price);

  return (
    <div className={style.topRated}>
      <Links url={pathUrl}>
        <Image width="74px" height="74px" src={img} alt="Not found" />
      </Links>
      <div className={style.details}>
        <Text variant="h4">
          <Links url={pathUrl}>{title}</Links>
        </Text>
        <Text>&#8377;{discountPrice}</Text>

        <Rating star={star} />
      </div>
    </div>
  );
};

export default memo(TopRated);
