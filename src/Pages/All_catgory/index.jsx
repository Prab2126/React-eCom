import { useLoaderData } from "react-router-dom";

import CurrentlyView from "../../Components/molecules/CurrentlyView";
import Text from "../../Components/atoms/Text";
import Input from "../../Components/atoms/Input";
import Ad from "../../Components/molecules/Ad";
import ItemNav from "../../Components/molecules/ItemsNav";
import Button from "../../Components/atoms/Button";

import useCatogry from "../../Hooks/useCatogry";

import style from "./style.module.scss";

const All_catgory = () => {
  const { currently, data } = useLoaderData(); // run at onece

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

  return Array.isArray(data) ? (
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
              price &#8377;0 --- &#8377;{price_filter}{" "}
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
          <ItemNav
            active={items_layout}
            onClickExpand={handleOnExpand}
            onClickCollapse={handleOnCollapse}
            value={items_level}
            onChange={onChange}
            total_items={total_items}
          />
          <div
            className={style[`${items_layout ? "collapse-" : ""}card-render`]}
          >
            {itemsRender(items)}
          </div>
        </div>
      </main>
    </section>
  ) : (
    <Text variant="h1" className="no-items">
      Try to Connect Internet to make this page accessable
    </Text>
  );
};

export default All_catgory;
