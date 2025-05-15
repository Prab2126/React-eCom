import { memo, useState } from "react";

import Input from "../../atoms/Input";
import Text from "../../atoms/Text";

import style from "./style.module.scss";

const data = JSON.parse(localStorage.getItem("data"));

const SearchItems = () => {
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
    }, 500);
  };

  return (
    <div className={style.searchArea}>
      <Input
        onChange={handleOnSearch}
        placeholder="Search items"
        value={searchItems.search}
      />

      <div className={style.itemsRendering}>
        {searchItems?.data?.map((items, id) => (
          <Text key={id}>{items.title}</Text>
        ))}
      </div>
    </div>
  );
};
export default memo(SearchItems);
