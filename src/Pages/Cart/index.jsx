import ItemNav from "../../Components/molecules/ItemsNav";
import Text from "../../Components/atoms/Text";

import { useThemeContext } from "../../Context/ThemeProvider";

import useCartLogic from "../../Hooks/useCartLogic";

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

  return (
    <main
      className={`${style.cartArea} ${haveItems ? style.notFound : ""} ${
        style[darkBgTheme]
      }`}
    >
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
          className={style[`${items_layout ? "collapse-" : ""}card-render`]}
        >
          {renderItems(cartItems)}
        </div>
      ) : (
        <Text className="no-items" variant="h1">
          No items found
        </Text>
      )}
    </main>
  );
};

export default Cart;
