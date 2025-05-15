import { createContext, useContext, useReducer, useState } from "react";

const ProductContext = createContext(); /// data store

// provide data from ProductContext

const preorder = {
  cart: {
    length: 0,
    items: [],
  },
  waitList: {
    length: 0,
    items: [],
  },
};

const reducer = (state, action) => {
  const { type, payload } = action || {};

  const { item, isAdded } = payload || {};

  switch (type) {
    case "ADD-TO-CART": {
      const length = state?.cart?.length;
      const items = state?.cart?.items;

      const cartState = {
        length: length >= 99 ? 99 : items.length + 1,
        items: [...items, { ...item, isAdded }],
      };
      return { ...state, cart: cartState };
    }
    case "REMOVE-FROM-CART": {
      const items = state?.cart?.items || [];

      const filteredItems = items.filter((stateItem) => stateItem !== item);

      const cartState = {
        length: filteredItems.length,
        items: [...filteredItems],
      };
      return { ...state, cart: cartState };
    }
    case "ADD-TO-WAITLIST": {
      const length = state?.waitList?.length;
      const items = state?.waitList?.items;

      const waitList = {
        length: length >= 99 ? 99 : items.length + 1,
        items: [...items, { ...item, isAdded }],
      };
      return { ...state, waitList: waitList };
    }

    case "REMOVE-FROM-WAITLIST": {
      const items = state?.waitList?.items || [];

      const filteredItems = items.filter((stateItem) => stateItem !== item);

      const cartState = {
        length: filteredItems.length,
        items: [...filteredItems],
      };
      return { ...state, waitList: cartState };
    }

    case "CHANGE-CART-AREA": {
      const cart = state?.cart;
      return { ...state, cart: { ...cart, items: [...item] } };
    }

    case "CHANGE-WAITLIST-AREA": {
      const waitList = state?.waitList;
      return { ...state, waitList: { ...waitList, items: [...item] } };
    }
  }
};

const userTriggering = (state, action) => {
  const { type, value } = action;

  switch (type) {
    case "ITEMS-LAYOUT":
      return { ...state, items_layout: value };
    case "ITEMS-LEVEL":
      return { ...state, items_level: value };
  }
};

const defaultUserItems = {
  items_level: "latest",
  items_layout: false,
};

const tempData = {
  items: [],
  update: true,
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, preorder);

  const [updateCatagry, setUpdateCatagry] = useReducer(
    userTriggering,
    defaultUserItems
  );

  const [tempDatas, setTempDatas] = useState(tempData);

  return (
    <ProductContext.Provider
      value={{
        tempDatas,
        setTempDatas,
        state,
        dispatch,
        updateCatagry,
        setUpdateCatagry,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

const useProductContext = () => useContext(ProductContext);

export default useProductContext;
