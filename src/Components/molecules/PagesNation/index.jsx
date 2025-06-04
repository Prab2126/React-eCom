import { memo, useEffect, useState } from "react";

import { useThemeContext } from "../../../Context/ThemeProvider";

import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import ProductInfo from "../ProductInfo";
import Review from "../Review";

import style from "./style.module.scss";

const PageNation = (props) => {
  const {
    description = "w/n",
    reviews = [],
    info = [],
    id = null,
    renderItems = [],
  } = props || {};

  const [category, setCategory] = useState({
    type: "description",
    current: 0,
  });

  const [comments, setComments] = useState([...reviews]);

  useEffect(() => {
    setComments([...reviews]);
  }, [reviews]);

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data"));

    const updateReviews = localData.map((item) =>
      item.id == id ? { ...item, reviews: comments } : item
    );

    const itemsInString = JSON.stringify(updateReviews);

    localStorage.setItem("data", itemsInString);
  }, [comments]);

  const reviewCount = comments.length;

  const { textDarkTheme, buttonDarkTheme } = useThemeContext();

  const render = (type) => {
    switch (type) {
      case "description":
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
      case "additonal": {
        return info.map((item, index) => (
          <ProductInfo
            key={index}
            index={index}
            topic={item[0]}
            info={item[1]}
          />
        ));
      }
      case "review":
        return <Review comments={comments} setComments={setComments} />;
    }
  };

  const handleOnClickToCategory = ({ target }) => {
    const firstLowerCase = target.innerText.split(" ")[0].toLowerCase();
    const id = target.dataset.id;
    setCategory((prev) => ({ ...prev, type: firstLowerCase, current: +id }));
  };

  const renderNavBtn = (items) =>
    items.map((value, id) => {
      const underLine = category.current === id ? "activeUnderLine" : "";

      return (
        <Button
          key={id}
          id={id}
          className={` hoverEffect ${underLine} ${buttonDarkTheme}`}
          onClick={handleOnClickToCategory}
        >
          {id == 2 ? `${value}(${reviewCount})` : value}
        </Button>
      );
    });

  return (
    <div className={style["info-Visiting-Area"]}>
      <nav className={style.navigation}>{renderNavBtn(renderItems)}</nav>
      <div className={style.infoContaner}>{render(category.type)}</div>
    </div>
  );
};

export default memo(PageNation);
