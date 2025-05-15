import { memo } from "react";

import { useThemeContext } from "../../../Context/ThemeProvider";

import Text from "../../atoms/Text";
import Links from "../../atoms/Links";

import style from "./style.module.scss";

const categoryTitles = {
  home: "Welcome to Your Ultimate Shopping Destination – Start Here!",
  electronics: "Top Tech Deals on Electronics – Smart Devices, Smarter Prices!",
  fashion: "Trendy & Affordable Apparel for Every Season – Style That Speaks!",
  "home&furniture":
    "Modern & Comfortable Furniture – Upgrade Your Space in Style!",
  "beauty&personalCare":
    "Glow Up with Premium Beauty & Personal Care Essentials!",
  "sports&outdoors": "Adventure Awaits – Gear Up for Sports & Outdoor Fun!",
};
const CurrentlyView = (props) => {
  const { currentlyOn = null, currentlyItem = null } = props || {};

  const title = categoryTitles[currentlyOn];

  const { theme, linkDarkTheme, textDarkTheme } = useThemeContext();
  const currentlyDarkTheme = theme ? "" : "darkTheme";

  return (
    <div className={`${style.pageTitle} ${style[currentlyDarkTheme]}`}>
      <Text variant="h1" className={textDarkTheme}>
        {title}
      </Text>
      <div className={style["links-area"]}>
        <Links url="/" className={`hover ${linkDarkTheme}`}>
          Home
        </Links>

        <Text variant="span"> {">"} </Text>
        <Text className={Text.class.GRAY}>catogry</Text>
        <Text variant="span"> {">"} </Text>

        <Text className={Text.class.GRAY}>{currentlyOn}</Text>
        {currentlyItem && (
          <>
            {" "}
            <Text variant="span"> {">"} </Text>
            <Text className={Text.class.GRAY}>{currentlyItem}</Text>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(CurrentlyView);
