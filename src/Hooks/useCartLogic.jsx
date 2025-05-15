import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";

import useProductContext from "../Context/Product-provider";

import ProductCard from "../Components/molecules/ProductCard";

import filterByCategory from "../Utils/filterByCategory";

import useOnNavNameChange from "./useOnNavNameChange";

const useCartLogic = () => {
  const { data } = useLoaderData() || {};

  const itemsPrices = useMemo(() => data.map(({ price }) => price), [data]);

  const { state, updateCatagry, setUpdateCatagry, tempDatas, dispatch } =
    useProductContext();
  const { items_layout } = updateCatagry ?? {};

  const { length: cartLength, items: cartItems = [] } = state?.cart || {};

  const handleOnCollapse = () => {
    setUpdateCatagry({ type: "ITEMS-LAYOUT", value: false });
  };
  const handleOnExpand = () => {
    setUpdateCatagry({ type: "ITEMS-LAYOUT", value: true });
  };

  const renderItems = (items) => {
    return items?.map((item) => {
      const {
        description = "",
        images = [],
        title = "",
        category = "",
        price = 100,
        totalPrice = 1,
        id,
      } = item || {};

      const presentRoute = filterByCategory(category, null, "route");
      const pathUrl = `/category/${presentRoute}/details/${id}`;

      return (
        <ProductCard
          pathUrl={pathUrl}
          expand={items_layout}
          totalPrice={totalPrice}
          imgUrl={images[0]}
          data={data}
          id={id}
          key={id}
          price={price}
          description={description}
          title={title}
        />
      );
    });
  };

  const [changeNav, setChangeNav] = useState("latest");

  const onChangeFunction = useOnNavNameChange();
  const onChange = (event) => {
    setChangeNav(event.target.value);

    onChangeFunction(event, dispatch, tempDatas, itemsPrices, {
      isReducer: true,
      title: "CHANGE-CART-AREA",
      state,
    });
  };
  return {
    changeNav,
    onChange,
    itemsPrices,
    updateCatagry,
    state,
    cartLength,
    cartItems,
    handleOnCollapse,
    handleOnExpand,
    renderItems,
  };
};
export default useCartLogic;
