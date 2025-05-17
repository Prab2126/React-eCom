import { createContext, useContext, useState } from "react";

import useProductContext from "./Product-provider";

const LogicContextProvider = createContext();

const localData = JSON.parse(localStorage.getItem("data"));

const LogicProvider = ({ children }) => {
  const [isPreviewing, setIsPreviewing] = useState({
    imgUrl: "",
    toShow: false,
  });

  const handleOnViewNow = (update) => {
    setIsPreviewing(update);
  };

  const { state, dispatch } = useProductContext() || {};
  const { cart, waitList } = state || {};

  function updateContext(dataset, typeOfUpdate, whichType) {
    const categoryType = typeOfUpdate.split("-").reverse()[0];

    const isCart =
      categoryType === "WAITLIST"
        ? waitList
        : categoryType === "CART"
        ? cart
        : {};

    const { id: elementID } = dataset || {};
    const { items } = isCart;

    function isAddedChecker(items) {
      const { isAdded } = items?.find((item) => item?.id == elementID) || {};
      return { isAdded };
    }
    const { isAdded } = isAddedChecker(items);

    const toRemove = whichType === "remove" ? items : localData;

    const isItem = toRemove.find(({ id } = {}) => id == elementID);

    if (!isAdded || whichType === "remove") {
      dispatch({
        type: typeOfUpdate,
        payload: { item: isItem, isAdded: !isAdded },
      });
    }

    switch (typeOfUpdate) {
      case "ADD-TO-CART":
        dataset.workofbtn = "REMOVE-FROM-CART";
        break;
      case "REMOVE-FROM-CART":
        dataset.workofbtn = "ADD-TO-CART";
        break;
      case "ADD-TO-WAITLIST":
        dataset.workofbtn = "REMOVE-FROM-WAITLIST";
        break;
      case "REMOVE-FROM-WAITLIST":
        dataset.workofbtn = "ADD-TO-WAITLIST";
        break;
    }
  }

  const handleOnClickToAddCart = (dataset) => {
    updateContext(dataset, "ADD-TO-CART");
  };

  const handleOnClickToAddWaitList = (dataset) => {
    updateContext(dataset, "ADD-TO-WAITLIST");
  };

  const handleOnClickToRemoveCart = (dataset) => {
    updateContext(dataset, "REMOVE-FROM-CART", "remove");
  };

  const handleOnClickToRemoveWaitList = (dataset) => {
    updateContext(dataset, "REMOVE-FROM-WAITLIST", "remove");
  };

  return (
    <LogicContextProvider.Provider
      value={{
        setIsPreviewing,
        isPreviewing,
        handleOnClickToRemoveCart,
        handleOnClickToAddWaitList,
        handleOnViewNow,
        handleOnClickToAddCart,
        handleOnClickToRemoveWaitList,
      }}
    >
      {children}
    </LogicContextProvider.Provider>
  );
};

export default LogicProvider;

export const useLogicContextProvider = () => useContext(LogicContextProvider);
