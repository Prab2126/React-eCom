import { useLoaderData, useNavigation } from "react-router-dom";

import useProductContext from "../../Context/Product-provider";
import { useThemeContext } from "../../Context/ThemeProvider";

import ProductCard from "../../Components/molecules/ProductCard";
import Text from "../../Components/atoms/Text";
import RealPageNation from "../../Components/molecules/RealPageNation";
import Loader from "../../Components/molecules/Loader";

import filterByCategory from "../../Utils/filterByCategory";
import useEventAdder from "../../Hooks/useEventAdder";
import correctNumbering from "../../Utils/correctNumbering";

import style from "./style.module.scss";

const WaitList = () => {
  const { data } = useLoaderData() || {};

  const { state: loading } = useNavigation();

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
        id = null,
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

  const handleOnAllItemsClick = useEventAdder();

  const { max_count, itemLength } = correctNumbering(8, waitList.length);

  return loading === "loading" ? (
    <Loader />
  ) : (
    <main
      className={`${style.waitListArea} ${haveItems ? style.notFound : ""} ${
        style[darkBgTheme]
      } `}
    >
      <RealPageNation
        items={waitList}
        min_count={0}
        max_count={max_count}
        totalLength={itemLength}
      >
        {(newItems) => (
          <>
            {haveItems ? (
              <div
                onClick={handleOnAllItemsClick}
                className={style["collapse-card-render"]}
              >
                {renderItems(newItems)}
              </div>
            ) : (
              <Text className="no-items" variant="h1">
                No waitlist found
              </Text>
            )}
          </>
        )}
      </RealPageNation>
    </main>
  );
};

export default WaitList;
