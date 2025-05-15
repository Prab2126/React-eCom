"use strict";
const high_price_items = (items, price_list = [], isLowerPrice) => {
  let list = price_list.sort((curr, prev) => prev - curr);

  if (isLowerPrice === "lower-price") list.reverse();

  const high_price_items_list = [];

  list.forEach((value) => {
    const isItemPresent = items.filter(({ price } = {}) => price == value);
    // [{},{}]

    if (isItemPresent) {
      const noClone = isItemPresent.find(
        ({ id }) =>
          id !== high_price_items_list.find((item) => item.id == id)?.id
      );
      if (noClone) high_price_items_list.push(noClone);
    }
  });
  return high_price_items_list;
};

export default high_price_items;
