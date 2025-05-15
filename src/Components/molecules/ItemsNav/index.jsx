import { memo } from "react";
import { CiGrid41, CiCircleList } from "react-icons/ci";

import Text from "../../atoms/Text";
import Button from "../../atoms/Button";

import style from "./style.module.scss";
import { useThemeContext } from "../../../Context/ThemeProvider";

const fun = () => {};

const ItemNav = (props) => {
  const { theme, buttonDarkTheme, textDarkTheme } = useThemeContext();

  const {
    onChange = fun,
    onClickCollapse = fun,
    onClickExpand = fun,
    total_items = 0,
    value = "",
    active = false,
  } = props || {};
  const navDarkTheme = theme ? "" : "darkTheme";
  return (
    <nav className={`${style.itemsNav} ${style[navDarkTheme]}`}>
      <div className={style.changeItems}>
        <Text className={`${Text.class.DARKGRAY} ${textDarkTheme}`}>
          {total_items} items found{" "}
        </Text>

        <select onChange={onChange} value={value}>
          <option value="latest">Latest</option>
          <option value="higher">higher priced items</option>
          <option value="lower">lower priced items</option>
        </select>
      </div>

      <div className={style.changeItemsCatogry}>
        <Button
          className={`${active ? "" : "red"} ${buttonDarkTheme}`}
          onClick={onClickCollapse}
        >
          <CiGrid41 />
        </Button>
        <Button
          className={`${active ? "red" : ""} ${buttonDarkTheme}`}
          onClick={onClickExpand}
        >
          <CiCircleList />
        </Button>
      </div>
    </nav>
  );
};

export default memo(ItemNav);
