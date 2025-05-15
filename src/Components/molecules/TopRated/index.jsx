import { memo } from "react";

import { useThemeContext } from "../../../Context/ThemeProvider";

import Text from "../../atoms/Text";
import Image from "../../atoms/Image";
import Links from "../../atoms/Links";
import Rating from "../../molecules/Rating";

import style from "./style.module.scss";

const TopRated = (props) => {
  const {
    img = "",
    pathUrl = "",
    title = "title",
    price = 0,
    star = 1,
  } = props || {};
  const { linkDarkTheme } = useThemeContext();

  return (
    <div className={style.topRated}>
      <Links url={pathUrl}>
        <Image width="74px" height="74px" src={img} alt="Not found" />
      </Links>
      <div className={style.details}>
        <Text variant="h4">
          <Links className={`black ${linkDarkTheme}`} url={pathUrl}>
            {title}
          </Links>
        </Text>
        <Text>&#8377;{price}</Text>

        <Rating star={star} />
      </div>
    </div>
  );
};

export default memo(TopRated);
