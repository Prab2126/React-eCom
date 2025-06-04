import priceStructure from "./priceStructure";

const api = "https://dummyjson.com/products?limit=194";

const fetch_data = async () => {
  try {
    const jsonData = await fetch(api);

    if (!jsonData.ok) throw new Error("data not found");

    const { products } = await jsonData.json();

    const indianPrice = products?.map((e) => ({
      ...e,
      takenItems: e.minimumOrderQuantity,
      price: (e.price * 84).toFixed(2),
      totalPrice: priceStructure(
        Math.floor((e?.price * 84 * 100) / e?.discountPercentage)
      ),
    }));

    return indianPrice;
  } catch (err) {
    return [{ title: err.message }];
  }
};
export default fetch_data;
