import { useLoaderData, useParams } from "react-router-dom";

import useProductContext from "../../Context/Product-provider";
import { useThemeContext } from "../../Context/ThemeProvider";

import Text from "../../Components/atoms/Text";
import Counter from "../../Components/molecules/Counter";
import CurrentlyView from "../../Components/molecules/CurrentlyView";
import Rating from "../../Components/molecules/Rating";
import Button from "../../Components/atoms/Button";
import PageNation from "../../Components/molecules/PagesNation";
import ProductShowCase from "../../Components/molecules/ProductShowCase";

import useEventAdder from "../../Hooks/useEventAdder";

import style from "./style.module.scss";

const Item_info = () => {
  const { currently, data } = useLoaderData();

  const uniqueID = useParams()?.id;
  const item = data.find(({ id } = {}) => id == uniqueID) ?? {};

  const { theme, textDarkTheme } = useThemeContext();

  const mainTheme = theme ? "" : "darkMainTheme";
  const counterTheme = theme ? "" : "darkCounterTheme";

  const {
    title = "n/w",
    rating = 0,
    description = "discription",
    minimumOrderQuantity = 1,
    stock = 1,
    id = 1,
    images = [],
    thumbnail = "",
    totalPrice = 1,
    price = 1,

    reviews = [],
  } = item;

  const { state } = useProductContext() || {};
  const handleOnAllItemsClick = useEventAdder();

  const cartItems = state?.cart?.items;

  const { isAdded } = cartItems?.find((item) => item.id === id) || {};

  const isAddedToCart = isAdded
    ? { title: "Remove from", className: "removeFromCart" }
    : { title: "Add to", className: "" };

  const rated = Math.floor(rating);

  return (
    <main
      onClick={handleOnAllItemsClick}
      className={`${style.detailComponent} ${style[mainTheme]}`}
    >
      <CurrentlyView currentlyOn={currently} currentlyItem={uniqueID} />

      <section className={style.details}>
        <ProductShowCase thumbnail={thumbnail} images={images} />

        <aside className={style.information}>
          <Text className={textDarkTheme} variant="h1">
            {title}
          </Text>
          <div className={style["review-info"]}>
            <Rating star={rated} />
            <Text className={textDarkTheme}>{rated} reviews</Text>
          </div>

          <div className={style.price}>
            <Text
              className={`${Text.class.FACEPRICE} ${Text.class.GRAY} ${style.stricked} `}
            >
              &#8377;{totalPrice}
            </Text>
            <Text variant="h2" className={Text.class.GREEN}>
              &#8377;{price}
            </Text>
          </div>

          <Text
            className={`${Text.class.DARKGRAY} ${textDarkTheme} ${style.description} `}
          >
            {" "}
            {description}{" "}
          </Text>

          <div className={`${style["qtn-carting"]}`}>
            <Counter
              maxValue={stock}
              className={`${style.counter} ${style[counterTheme]}`}
              intiValue={minimumOrderQuantity}
              prevSym="-"
              nextSym="+"
            >
              {(count) => <Text>{count}</Text>}
            </Counter>

            <Button
              className={`${Button?.class?.CART}  ${isAddedToCart.className} `}
              id={id}
              workofbtn={isAdded ? "REMOVE-FROM-CART" : "ADD-TO-CART"}
            >
              {isAddedToCart.title} Cart
            </Button>
          </div>
        </aside>
      </section>

      <section className={style["details-info"]}>
        <PageNation
          description={item.description}
          reviews={reviews}
          info={{}}
        />
      </section>
    </main>
  );
};

export default Item_info;
