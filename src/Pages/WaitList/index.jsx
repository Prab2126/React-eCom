import { useLoaderData } from "react-router-dom";

import useProductContext from "../../Context/Product-provider";
import { useThemeContext } from "../../Context/ThemeProvider";

import ProductCard from "../../Components/molecules/ProductCard";
import Text from "../../Components/atoms/Text";

import filterByCategory from "../../Utils/filterByCategory";

import style from "./style.module.scss";

const WaitList = () => {
  const { data } = useLoaderData() || {};

  const { state, updateCatagry } = useProductContext();

  const { items_layout } = updateCatagry ?? {};

  const { items: waitList = [] } = state?.waitList || {};

  const renderItems = (items) => {
    return items?.map((item) => {
      const {
        description = "",
        images = [],
        title = "",
        category = "",
        price = 100,
        id,
        totalPrice = 1,
      } = item || {};

      const presentRoute = filterByCategory(category, null, "route");
      const pathUrl = `/category/${presentRoute}/details/${id}`;

      return (
        <ProductCard
          pathUrl={pathUrl}
          expand={items_layout}
          imgUrl={images[0]}
          data={data}
          totalPrice={totalPrice}
          id={id}
          key={id}
          price={price}
          isWaitList={true}
          description={description}
          title={title}
        />
      );
    });
  };

  const haveItems = !!waitList.length;

  const { theme } = useThemeContext();
  const darkBgTheme = theme ? "" : "darkTheme";
  return (
    <main
      className={`${style.waitListArea} ${haveItems ? style.notFound : ""} ${
        style[darkBgTheme]
      } `}
    >
      {haveItems ? (
        <div className={style["collapse-card-render"]}>
          {renderItems(waitList)}
        </div>
      ) : (
        <Text className="no-items" variant="h1">
          No waitlist found
        </Text>
      )}
    </main>
  );
};

export default WaitList;
