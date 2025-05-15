import { useState } from "react";
import useProductContext from "../Context/Product-provider";

const useProductCardLogic = (id = 1, data = [], expand = false, style = {}) => {
  const { state, dispatch, setTempDatas, tempDatas } =
    useProductContext() || {};
  const { cart, waitList } = state || {};

  const { cart: isCartItemsAdded, waitList: isWaitListItemsAdded } = {
    cart: cart?.items?.find((item) => item.id === id)?.isAdded,
    waitList: waitList?.items?.find((item) => item.id === id)?.isAdded,
  };

  const card = expand ? style["expand-card"] : style["collapse-card"];

  const cartArea = expand
    ? style["expand-cartArea"]
    : style["collapse-cartArea"];

  const controller = expand
    ? style["expand-controller"]
    : style["collapse-controller"];

  const details = expand ? style["expand-details"] : style["collapse-details"];

  const handleOnClickToAddCart = ({ currentTarget } = {}) => {
    const { id } = currentTarget.dataset;
    const haveOldItem = cart?.items?.find((item) => item?.id == id);
    const item = data.find((item) => item?.id == id);

    if (!haveOldItem)
      dispatch({
        type: "ADD-TO-CART",
        payload: { item, isAdded: !isCartItemsAdded },
      });
  };

  const handleOnClickToAddWaitList = ({ currentTarget } = {}) => {
    const { id } = currentTarget.dataset;
    const haveOldItem = waitList?.items?.find((item) => item?.id == id);
    const item = data.find((item) => item?.id == id);

    if (!haveOldItem)
      dispatch({
        type: "ADD-TO-WAITLIST",
        payload: {
          item,
          isAdded: !isWaitListItemsAdded,
        },
      });
  };

  const handleOnClickToRemoveCart = ({ currentTarget } = {}) => {
    const { id } = currentTarget.dataset;
    const removeItem = cart?.items?.find((item) => item?.id == id);
    const latestUpdatedItems = tempDatas?.items?.filter(
      (item) => item != removeItem
    );
    setTempDatas({ items: latestUpdatedItems, update: true });

    dispatch({
      type: "REMOVE-FROM-CART",
      payload: {
        item: removeItem,
      },
    });
  };

  const handleOnClickToRemoveWaitList = ({ currentTarget } = {}) => {
    const { id } = currentTarget.dataset;
    const removeItem = waitList?.items?.find((item) => item?.id == id);

    dispatch({
      type: "REMOVE-FROM-WAITLIST",
      payload: {
        item: removeItem,
      },
    });
  };

  const isAddedToCart = isCartItemsAdded
    ? { title: "Remove from", className: "removeFromCart" }
    : { title: "Add to", className: "" };

  const isAddedToWaitList = isWaitListItemsAdded ? "addedToWaitList" : "";

  const [isPreviewing, setIsPreviewing] = useState(false);

  const handleOnViewNow = () => {
    setIsPreviewing(true);
  };
  return {
    cartArea,
    card,
    isWaitListItemsAdded,
    isCartItemsAdded,
    handleOnClickToRemoveCart,
    controller,
    handleOnClickToRemoveWaitList,
    details,
    handleOnClickToAddCart,
    handleOnClickToAddWaitList,
    isAddedToCart,
    isAddedToWaitList,
    setIsPreviewing,
    isPreviewing,
    handleOnViewNow,
  };
};

export default useProductCardLogic;
