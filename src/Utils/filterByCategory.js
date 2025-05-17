const filterByCategory = (
  elementName = "none",
  items = [],
  anyCase = false
) => {
  const categorays = {
    electronics: ["smartphones", "laptops", "tablets", "mobile-accessories"],
    fashion: [
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "womens-dresses",
      "womens-shoes",
      "womens-bags",
      "womens-jewellery",
      "womens-watches",
      "sunglasses",
    ],
    "home&furniture": ["furniture", "home-decoration", "kitchen-accessories"],
    "beauty&personalCare": ["beauty", "skin-care", "fragrances"],
    "sports&outdoors": ["sports-accessories", "motorcycle", "vehicle"],
  };

  if (anyCase === "route") {
    let routeName = "";
    for (const category in categorays) {
      const isItemPresent = categorays[category].includes(elementName);
      if (isItemPresent) {
        routeName = category;
        break;
      }
    }
    return routeName;
  } else if (anyCase === "takeAllData") {
    const newData = [];

    for (const value in categorays) {
      const isPresent = items.filter(({ category } = {}) =>
        categorays[value].includes(category)
      );

      if (isPresent) newData.push(...isPresent);
    }

    return newData;
  } else {
    const finalData = items.filter(({ category }) =>
      categorays[elementName]?.includes(category)
    );

    return {
      currently: elementName,
      data: finalData.length ? finalData : items,
    };
  }
};

export default filterByCategory;
