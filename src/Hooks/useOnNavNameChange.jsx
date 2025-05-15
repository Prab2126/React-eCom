import useProductContext from "../Context/Product-provider";

import onChangeOption from "../Utils/onChangeOption";

const useOnNavNameChange = () => {
  const { setUpdateCatagry, setTempDatas } = useProductContext();

  return (event, setItems, items, itemsPrices, reducer = {}) => {
    const { target } = event;
    if (!reducer?.isReducer)
      setUpdateCatagry({ type: "ITEMS-LEVEL", value: target.value });

    onChangeOption.call(
      target,
      setItems,
      items,
      itemsPrices,
      setTempDatas,
      reducer
    );
  };
};

export default useOnNavNameChange;
