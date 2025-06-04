import { memo, useState } from "react";

import Input from "../../atoms/Input";
import ItemsAtSearch from "../ItemsAtSearch";
import Text from "../../atoms/Text";

import style from "./style.module.scss";

const data = JSON.parse(localStorage.getItem("data")) ?? [];

const SearchItems = (props) => {
  const {
    handleOnVisibleSearch = () => {},
    handleOnRemoveSearchBox = () => {},
    autoFocus = false,
  } = props || {};

  const [searchItems, setSearchItems] = useState({ search: "", data: [] });

  let debounching;
  const handleOnSearch = (event) => {
    const { value } = event.target || {};

    setSearchItems((prev) => ({ ...prev, search: value }));

    clearTimeout(debounching);

    debounching = setTimeout(() => {
      const newUpdatedValue = value?.trim() || null;

      const newItems = data.filter((item) => {
        const title = item?.title;

        const correctPattern = new RegExp(`${newUpdatedValue}`, "gi").test(
          title
        );
        return correctPattern;
      });
      setSearchItems((prev) => ({ ...prev, data: newItems }));
    }, 450);
  };

  const searchedItems = () =>
    searchItems?.data?.map(({ title, thumbnail, category, id } = {}) => (
      <ItemsAtSearch
        src={thumbnail}
        category={category}
        id={id}
        key={id}
        title={title}
      />
    ));

  return (
    <section className={style.searchPopUp} onClick={handleOnVisibleSearch}>
      <div className={style.searchArea}>
        <Input
          onChange={handleOnSearch}
          autoFocus={autoFocus}
          placeholder="Search items"
          value={searchItems.search}
        />

        <div className={style.itemsRendering} onClick={handleOnRemoveSearchBox}>
          {searchItems?.data?.length ? (
            searchedItems()
          ) : (
            <Text>
              <Text variant="span" className="highLighter">
                ctrl
              </Text>{" "}
              +{" "}
              <Text variant="span" className="highLighter">
                .
              </Text>{" "}
              to open search box
            </Text>
          )}
        </div>
      </div>
    </section>
  );
};
export default memo(SearchItems);
