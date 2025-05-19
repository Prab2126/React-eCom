import ItemNav from "../../Components/molecules/ItemsNav";
import Text from "../../Components/atoms/Text";

import { useThemeContext } from "../../Context/ThemeProvider";

import RealPageNation from "../../Components/molecules/RealPageNation";

import useCartLogic from "../../Hooks/useCartLogic";
import correctNumbering from "../../Utils/correctNumbering";
import useEventAdder from "../../Hooks/useEventAdder";

import style from "./style.module.scss";

const Cart = () => {
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

  const handleOnAllItemsClick = useEventAdder();

  const { max_count, itemLength } = correctNumbering(4, cartLength);

  return (
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
    </main>
  );
};

export default Cart;
