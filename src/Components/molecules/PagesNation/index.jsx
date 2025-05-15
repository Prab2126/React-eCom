import { useState } from "react";

import { useThemeContext } from "../../../Context/ThemeProvider";

import Text from "../../atoms/Text";
import Button from "../../atoms/Button";

import style from "./style.module.scss";

const PageNation = (props) => {
  const { description = "w/n", reviews = [], info = {} } = props || {};

  const reviewCount = reviews.length;

  const [category, setCategory] = useState("discription");

  // const isActive = {};

  const { textDarkTheme, buttonDarkTheme } = useThemeContext();

  const render = (type) => {
    switch (type) {
      case "discription":
        return (
          <>
            <Text
              className={`${Text.class.DARKGRAY} ${textDarkTheme}`}
            >{`${description}`}</Text>
            <Text className={`${Text.class.DARKGRAY} ${textDarkTheme}`}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum,
              iure nam ipsam perspiciatis blanditiis natus fugiat debitis
              aliquid assumenda eligendi illum veritatis vero numquam voluptate
              explicabo vel laboriosam aliquam consequatur soluta, vitae ipsa
              pariatur deleniti. Magnam ex dolorem quo vitae illo nesciunt iure
              itaque nesciunt doloremque laboriosam ea nostrum provident, ad,
              eligendi laborum quisquam porro esse numquam. Vero dolor
              obcaecati, iure delectus veritatis ipsam voluptatum temporibus
              fugiat dolore eum mollitia dolorem recusandae. Esse ad nihil
              provident consectetur inventore quia in. Quas quae at repellendus
              earum sit consequatur dolorem, recusandae ipsa, quis sunt unde.
            </Text>
          </>
        );
      case "additonal":
        return;
      case "review":
        return;
    }
  };

  const handleOnClickToCategory = ({ target }) => {
    const firstLowerCase = target.textContant.split(" ")[0].toLowerCase;
    setCategory(firstLowerCase);
  };

  return (
    <div className={style["info-Visiting-Area"]}>
      <nav className={style.navigation}>
        <Button
          className={`${style.hovering} ${buttonDarkTheme}`}
          onClick={handleOnClickToCategory}
        >
          description
        </Button>
        <Button
          className={`${style.hovering} ${buttonDarkTheme}`}
          onClick={handleOnClickToCategory}
        >
          additonal information
        </Button>
        <Button
          className={`${style.hovering} ${buttonDarkTheme}`}
          onClick={handleOnClickToCategory}
        >
          review ({reviewCount})
        </Button>
      </nav>
      <div className={style.infoContaner}>{render(category)}</div>
    </div>
  );
};

export default PageNation;
