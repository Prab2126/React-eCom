import high_price_items from "./highPriced";

function onChangeOption(
  setItems = () => {},
  data = {},
  itemsPrices = [],
  setTempDatas = () => {},
  reducerValue = {}
) {
  const { isReducer, title, state } = reducerValue ?? {};

  const { items } = state?.cart ?? state?.waitList ?? {};

  if (data.update || data?.temp?.update)
    setTempDatas({
      items: isReducer ? items : data.items,
      update: false,
    });

  const { value } = this || {};

  switch (value) {
    case "higher":
      isReducer
        ? setItems({
            type: title,
            payload: {
              item: high_price_items(items, itemsPrices),
            },
          })
        : setItems(high_price_items(data?.items, itemsPrices));
      break;
    case "lower":
      isReducer
        ? setItems({
            type: title,
            payload: {
              item: high_price_items(items, itemsPrices, "lower-price"),
            },
          })
        : setItems(high_price_items(data?.items, itemsPrices, "lower-price"));
      break;
    default:
      if (isReducer) {
        setItems({ type: title, payload: { item: data.items } });
      } else
        setItems(data?.temp?.items.length ? data?.temp?.items : data?.items);

      setTempDatas({ items: [], update: true });
      break;
  }
}

export default onChangeOption;
