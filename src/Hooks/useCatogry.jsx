import { useCallback, useEffect, useMemo, useState } from "react";

import { useThemeContext } from "../Context/ThemeProvider";

import TopRated from "../Components/molecules/TopRated";
import Text from "../Components/atoms/Text";
import ProductCard from "../Components/molecules/ProductCard";

import uniqueData from "../Utils/uniqueData";
import useOnNavNameChange from "./useOnNavNameChange";
import useProductContext from "../Context/Product-provider";

const useCatogry = (currently, data = []) => {
  const itemsPrices = useMemo(() => data.map(({ price }) => price), [data]);

  const max_price = Math.floor(Math.max(...itemsPrices));

  const [price_filter, setPrice_filter] = useState(max_price);

  const { theme, textDarkTheme, textBgDarkTheme, buttonBgDarkTheme } =
    useThemeContext();

  const tag = useCallback(
    (tags) =>
      tags.map((tag, i) => (
        <Text key={i} className={`${Text.class.TAG} ${textBgDarkTheme}`}>
          {tag}
        </Text>
      )),
    []
  );

  const topItems = useCallback(() => {
    const itemsRating = data.map(({ rating, id }) => [rating, id]);

    const items = itemsRating.sort((cur, prev) => prev[0] - cur[0]).slice(0, 4);

    const topRatedItems = [];

    for (let run = 0; run < items.length; run++) {
      const top_item = data.find(({ id }) => id == items[run][1]);

      topRatedItems.push(top_item);
    }
    return topRatedItems;
  }, []);

  const topRatedItem = useCallback((topItems) => {
    return topItems.map((item) => {
      const {
        price = 9,
        rating = 0,
        images = [],
        id = 0,
        title = "w/n",
      } = item || {};
      const pathUrl = `/category/${currently}/details/${id}`;

      return (
        <TopRated
          pathUrl={pathUrl}
          img={images[0]}
          key={id}
          currently={currently}
          title={title}
          price={`${Math.floor(price)}`}
          star={Math.floor(rating)}
        />
      );
    });
  }, []);

  const cover = data[7];

  const tags = useMemo(() => uniqueData(data), [data]);

  const { updateCatagry, setUpdateCatagry, setTempDatas, tempDatas } =
    useProductContext();

  const handleOnCollapse = () => {
    setUpdateCatagry({ type: "ITEMS-LAYOUT", value: false });
  };
  const handleOnExpand = () => {
    setUpdateCatagry({ type: "ITEMS-LAYOUT", value: true });
  };

  const [items, setItems] = useState(data);

  const onChangeFunction = useOnNavNameChange();

  const onChange = (event) => {
    onChangeFunction(
      event,
      setItems,
      { items: items, temp: tempDatas },
      itemsPrices
    );
  };

  const handleOnPriceFilter = (event) => {
    const { value } = event.target || {};
    setPrice_filter(value);
  };

  const handleOnSubmitFilter = (event) => {
    event.preventDefault();

    setUpdateCatagry({ type: "ITEMS-LEVEL", value: "latest" });

    const value = data.filter((item) => Math.floor(item.price) <= price_filter);
    setItems(value);
    setTempDatas({ items: [], update: true });
  };
  useEffect(() => {
    setItems(data);
  }, [data]);

  const itemsRender = (items) => {
    return items.length ? (
      items?.map((item) => {
        const {
          description = "",
          images = [],
          title = "",
          totalPrice = 1,
          price = 100,
          id = 1,
        } = item || {};
        const pathUrl = `/category/${currently}/details/${id}`;

        return (
          <ProductCard
            pathUrl={pathUrl}
            expand={updateCatagry.items_layout}
            imgUrl={images[0]}
            totalPrice={totalPrice}
            items={items}
            data={data}
            id={id}
            price={price}
            description={description}
            title={title}
            key={id}
            fromMainParent={true}
          />
        );
      })
    ) : (
      <Text variant="h1" className="no-items">
        {data.length ? "No items found at this price range" : "No items found"}
      </Text>
    );
  };
  const total_items = items.length;

  return {
    tags,
    itemsRender,
    onChange,
    handleOnExpand,
    handleOnCollapse,
    items,
    cover,
    handleOnSubmitFilter,
    updateCatagry,
    topRatedItem,
    tag,
    price_filter,
    max_price,
    total_items,
    topItems,
    handleOnPriceFilter,
    theme,
    textDarkTheme,
    textBgDarkTheme,
    buttonBgDarkTheme,
  };
};

export default useCatogry;
