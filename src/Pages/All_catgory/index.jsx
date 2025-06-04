import { useLoaderData, useNavigation } from "react-router-dom";

import CurrentlyView from "../../Components/molecules/CurrentlyView";
import Text from "../../Components/atoms/Text";
import Input from "../../Components/atoms/Input";
import Ad from "../../Components/molecules/Ad";
import ItemNav from "../../Components/molecules/ItemsNav";
import RealPageNation from "../../Components/molecules/RealPageNation";
import Button from "../../Components/atoms/Button";
import Loader from "../../Components/molecules/Loader";

import priceStructure from "../../Utils/priceStructure";
import useEventAdder from "../../Hooks/useEventAdder";
import useCatogry from "../../Hooks/useCatogry";
import correctNumbering from "../../Utils/correctNumbering";

import style from "./style.module.scss";

const All_catgory = () => {
  const { currently, data } = useLoaderData(); // run at onece
  const { state: loading } = useNavigation();

  const handleOnAllItemsClick = useEventAdder();

  const {
    tags,
    itemsRender,
    updateCatagry,
    onChange,
    handleOnExpand,
    handleOnSubmitFilter,
    handleOnCollapse,
    items,
    cover,
    topRatedItem,
    tag,
    price_filter,
    max_price,
    total_items,
    topItems,
    handleOnPriceFilter,
    theme,
    textDarkTheme,
    buttonBgDarkTheme,
  } = useCatogry(currently, data);

  const { items_layout, items_level } = updateCatagry ?? {};

  const mainDarkTheme = theme ? "" : "darkTheme";

  const filterInIndianStyle = priceStructure(price_filter);

  const { max_count, itemLength } = correctNumbering(9, total_items);

  return Array.isArray(data) ? (
    loading === "loading" ? (
      <Loader />
    ) : (
      <section>
        <CurrentlyView currentlyOn={currently} />
        <main
          className={`${style[mainDarkTheme]} ${style["All_catgory-contaner"]}`}
        >
          <aside>
            <form
              onSubmit={handleOnSubmitFilter}
              className={style["range-fitler"]}
            >
              <Text variant="h2" className={textDarkTheme}>
                Filter by price
              </Text>
              <Input
                type="range"
                onChange={handleOnPriceFilter}
                min={0}
                value={price_filter}
                max={max_price}
              />
              <Text className={`${Text.class.DARKGRAY} ${textDarkTheme}`}>
                {" "}
                price &#8377;0 --- &#8377;{filterInIndianStyle}{" "}
              </Text>
              <Button
                className={`${Button.class.PRICE_FILTER} ${buttonBgDarkTheme}`}
              >
                Filter
              </Button>
            </form>
            <div className={style.tagsArea}>
              <Text variant="h2" className={textDarkTheme}>
                Product tags
              </Text>
              <div className={style.tags}>{tag(tags)}</div>
            </div>

            <div>
              <Text variant="h2" className={textDarkTheme}>
                Top rated products
              </Text>

              <div className={style.topRated}>{topRatedItem(topItems())}</div>
            </div>
            <Ad cover={cover} title={currently} />
          </aside>
          <div className={style.allItems}>
            <RealPageNation
              items={items}
              min_count={0}
              max_count={max_count}
              totalLength={itemLength}
            >
              {(newItems) => (
                <>
                  <ItemNav
                    active={items_layout}
                    onClickExpand={handleOnExpand}
                    onClickCollapse={handleOnCollapse}
                    value={items_level}
                    onChange={onChange}
                    total_items={newItems.length}
                  />

                  <div
                    onClick={handleOnAllItemsClick}
                    className={
                      style[`${items_layout ? "collapse-" : ""}card-render`]
                    }
                  >
                    {itemsRender(newItems)}
                  </div>
                </>
              )}
            </RealPageNation>
          </div>
        </main>
      </section>
    )
  ) : (
    <Text variant="h1" className="no-items">
      Try to Connect Internet to make this page accessable
    </Text>
  );
};

export default All_catgory;
