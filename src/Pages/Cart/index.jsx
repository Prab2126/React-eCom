import ItemNav from "../../Components/molecules/ItemsNav";
import Text from "../../Components/atoms/Text";
import { useNavigation } from "react-router-dom";

import { useThemeContext } from "../../Context/ThemeProvider";

import RealPageNation from "../../Components/molecules/RealPageNation";
import Loader from "../../Components/molecules/Loader";

import useCartLogic from "../../Hooks/useCartLogic";
import correctNumbering from "../../Utils/correctNumbering";
import useEventAdder from "../../Hooks/useEventAdder";
import priceStructure from "../../Utils/priceStructure";

import style from "./style.module.scss";

const Cart = () => {
  const { state: loading } = useNavigation();

  const {
    changeNav,
    onChange,
    cartLength,
    updateCatagry,
    cartItems,
    handleOnCollapse,
    handleOnExpand,
    renderItems,
  } = useCartLogic();

  const haveItems = !!cartItems.length;

  const { items_layout } = updateCatagry ?? {};

  const { theme } = useThemeContext();

  const darkBgTheme = theme ? "" : "darkTheme";

  const darkTotalArea = theme ? "" : "totalCalculatedAreaInDark";

  const handleOnAllItemsClick = useEventAdder();

  const { max_count, itemLength } = correctNumbering(4, cartLength);

  const totalCartPrice = cartItems
    .map(({ totalPrice } = {}) => Number(totalPrice.split(",").join("")))
    .reduce((init, next) => init + next, 0);

  const { structuredTotalPrice, shippingFee } = {
    structuredTotalPrice: priceStructure(totalCartPrice),
    shippingFee: 100,
  };

  const totalCalculated = priceStructure(totalCartPrice + shippingFee);

  return loading === "loading" ? (
    <Loader />
  ) : (
    <main
      className={`${style.cartArea} ${haveItems ? style.notFound : ""} ${
        style[darkBgTheme]
      }`}
    >
      <RealPageNation
        items={cartItems}
        min_count={0}
        max_count={max_count}
        totalLength={itemLength}
      >
        {(newItems) => (
          <>
            <ItemNav
              onClickExpand={handleOnExpand}
              onClickCollapse={handleOnCollapse}
              active={items_layout}
              total_items={cartLength}
              onChange={onChange}
              value={changeNav}
            />

            {haveItems ? (
              <div
                onClick={handleOnAllItemsClick}
                className={
                  style[`${items_layout ? "collapse-" : ""}card-render`]
                }
              >
                {renderItems(newItems)}
              </div>
            ) : (
              <Text className="no-items" variant="h1">
                No items found
              </Text>
            )}
          </>
        )}
      </RealPageNation>
      {haveItems && (
        <div
          className={` ${style.totalCalculatedArea} ${style[darkTotalArea]}`}
        >
          <div>
            <Text variant="span">subtotal:</Text>
            <Text>{structuredTotalPrice}</Text>
          </div>

          <div>
            <Text variant="span">shipping fee:</Text>
            <Text>{shippingFee}</Text>
          </div>
          <div>
            <Text variant="span">order total:</Text>
            <Text>{totalCalculated}</Text>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
