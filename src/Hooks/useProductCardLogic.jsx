import useProductContext from "../Context/Product-provider";

const useProductCardLogic = (id = 1, expand = false, style = {}) => {
  const { state } = useProductContext() || {};
  const { cart, waitList } = state || {};

  function isAddedChecker({ items } = {}) {
    return items?.find((item) => item.id === id)?.isAdded;
  }
  const { isCartItemsAdded, isWaitListItemsAdded } = {
    isCartItemsAdded: isAddedChecker(cart),
    isWaitListItemsAdded: isAddedChecker(waitList),
  };

  const card = expand ? style["expand-card"] : style["collapse-card"];

  const cartArea = expand
    ? style["expand-cartArea"]
    : style["collapse-cartArea"];

  const controller = expand
    ? style["expand-controller"]
    : style["collapse-controller"];

  const details = expand ? style["expand-details"] : style["collapse-details"];

  const isAddedToCart = isCartItemsAdded
    ? { title: "Remove from", className: "removeFromCart" }
    : { title: "Add to", className: "" };

  const isAddedToWaitList = isWaitListItemsAdded ? "addedToWaitList" : "";

  return {
    cartArea,
    card,
    controller,
    details,
    isAddedToCart,
    isAddedToWaitList,
  };
};

export default useProductCardLogic;
