import { memo } from "react";
import Image from "../../atoms/Image";
import Text from "../../atoms/Text";
import Links from "../../atoms/Links";

import style from "./style.module.scss";

const Ad = (props) => {
  const { title = "", cover = {} } = props || {};
  const { discountPercentage, id, images } = cover || {};
  const url = `/category/${title}/details/${id}`;
  return (
    <div className={style.banner}>
      <Image width="100%" height="100%" src={images[0] || null} />
      <div className={style.detail}>
        <div>
          <Text className={"titles"}>{title}</Text>
          <Text variant="h2">UP TO {Math.floor(discountPercentage)}% OFF</Text>
        </div>
        <Links url={url} className="hover">
          Shop now
        </Links>
      </div>
    </div>
  );
};

export default memo(Ad);
