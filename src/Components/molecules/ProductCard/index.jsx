import { memo } from "react";
import { FiSearch } from "react-icons/fi";

import { useThemeContext } from "../../../Context/ThemeProvider";

import Image from "../../atoms/Image";
import Text from "../../atoms/Text";
import Button from "../../atoms/Button";
import Links from "../../atoms/Links";

import priceStructure from "../../../Utils/priceStructure";
import useProductCardLogic from "../../../Hooks/useProductCardLogic";

import style from "./style.module.scss";

const ProductCard = (props) => {
  const {
    imgUrl = null,
    expand = false,
    title = "",
    id = 1,
    description = "",
    price = 20,
    pathUrl = "",
    totalPrice = 1,
    isWaitList = false,
  } = props || {};

  const { orginalPrice, discountPrice } = {
    orginalPrice: priceStructure(totalPrice),

    discountPrice: priceStructure(price),
  };

  const {
    cartArea,
    card,
    controller,
    details,
    isAddedToCart,
    isAddedToWaitList,
    isWaitListItemsAdded,
    isCartItemsAdded,
  } = useProductCardLogic(id, expand, style);

  const { theme, textDarkTheme, linkDarkTheme, buttonDarkTheme } =
    useThemeContext();

  const cardDarkTheme = theme ? "" : "darkTheme";

  const controllerDarkMod = theme ? "" : "darkBgTheme";

  const urlStyle = theme ? "darkHover" : "hover";

  const workofbtnWaitlist = isWaitListItemsAdded
    ? "REMOVE-FROM-WAITLIST"
    : "ADD-TO-WAITLIST";

  const workofbtnCart = isCartItemsAdded ? "REMOVE-FROM-CART" : "ADD-TO-CART";

  return (
    <div
      className={`${style["card-default"]} ${style[cardDarkTheme]} ${
        isWaitList ? style["expand-card"] : card
      }`}
    >
      <div className={style["img-preview-default"]}>
        <Image src={imgUrl} />
        <div className={`${style["cartArea-default"]} ${cartArea}`}>
          <div
            className={` ${style["controller-default"]} ${style[controllerDarkMod]} ${controller}`}
          >
            <Button
              workofbtn="search"
              imgurl={imgUrl}
              className={`buttonHover ${buttonDarkTheme}`}
            >
              <FiSearch />
            </Button>
            <Button
              workofbtn={workofbtnWaitlist}
              className={`buttonHover ${isAddedToWaitList} ${buttonDarkTheme} `}
              id={id}
            >
              ♥
            </Button>
          </div>
          <Button
            className={`${Button?.class?.CART} ${isAddedToCart.className} `}
            id={id}
            workofbtn={workofbtnCart}
          >
            {isAddedToCart.title} Cart
          </Button>
        </div>
      </div>

      <div className={isWaitList ? style["expand-details"] : details}>
        {expand || isWaitList ? (
          <Text variant="h1" className={textDarkTheme}>
            {title}
          </Text>
        ) : (
          <Text variant="h5">
            <Links url={pathUrl} className={`${urlStyle} ${linkDarkTheme}`}>
              {title}
            </Links>
          </Text>
        )}

        {(expand || isWaitList) && (
          <Text className={`${Text.class.DARKGRAY} ${textDarkTheme}`}>
            {description}
          </Text>
        )}

        <div className={style["price-area"]}>
          <Text className={textDarkTheme}>Price:-</Text>
          <Text
            variant="span"
            className={`${Text.class.FACEPRICE} ${Text.class.GRAY} `}
          >
            &#8377;{orginalPrice}
          </Text>

          <Text variant="span" className={`price ${Text.class.GREEN}`}>
            &#8377;{discountPrice}
          </Text>
        </div>
        {(expand || isWaitList) && (
          <Button>
            {" "}
            <Links url={pathUrl}>View</Links>
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(ProductCard);
