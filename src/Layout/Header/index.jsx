import { memo, useEffect, useState } from "react";

import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { MdLightMode } from "react-icons/md";
import { PiMoonFill } from "react-icons/pi";

import useProductContext from "../../Context/Product-provider";
import { useThemeContext } from "../../Context/ThemeProvider";

import Links from "../../Components/atoms/Links";
import Logo from "../../Components/molecules/Logo";
import Button from "../../Components/atoms/Button";

import style from "./style.module.scss";
import SearchItems from "../../Components/molecules/SearchItems";

const Header = () => {
  const { state } = useProductContext();
  const [search, setSearch] = useState(false);

  const handleOnNotVisibleSearch = ({ key, ctrlKey }) => {
    if (/\./.test(key) && ctrlKey) setSearch((prev) => !prev);
    else if (!key) setSearch(true);
  };

  const handleOnRemoveSearchBox = ({ currentTarget, target }) => {
    if (currentTarget !== target) setSearch(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleOnNotVisibleSearch);
    return () => {
      document.removeEventListener("keydown", handleOnNotVisibleSearch);
    };
  }, []);

  function handleOnVisibleSearch({ target, currentTarget } = {}) {
    if (target === currentTarget) setSearch(false);
  }

  const { theme, setTheme, linkDarkTheme, buttonDarkTheme } = useThemeContext();

  const { cart, waitList } = state;

  const waitListItems = waitList.length === 99 ? "99+" : waitList.length;
  const cartList = cart.length === 99 ? "99+" : cart.length;

  const handleOnThemeChange = () => {
    const storeTheme = !theme;
    localStorage.setItem("theme", storeTheme);

    setTheme(storeTheme);
  };

  const buttonRotateDarkTheme = theme ? "themeChanged" : "";

  const headerDarkTheme = theme ? "" : "headerDarkTheme";

  return (
    <>
      <header className={style[headerDarkTheme]}>
        <Logo theme={theme} />
        <nav className={style["links-area"]}>
          <Links className={linkDarkTheme} url="/">
            Home
          </Links>
          <Links className={linkDarkTheme} url="/category/electronics">
            Electronics
          </Links>
          <Links className={linkDarkTheme} url="/category/fashion">
            Fashion
          </Links>
          <Links className={linkDarkTheme} url="/category/home&furniture">
            Home & Furniture
          </Links>
          <Links className={linkDarkTheme} url="/category/beauty&personalCare">
            Beauty & Personal Care
          </Links>
          <Links className={linkDarkTheme} url="/category/sports&outdoors">
            Sports & Outdoors
          </Links>
        </nav>
        <div className={`${style["btn-area"]} `}>
          <Button
            className={buttonDarkTheme}
            onClick={handleOnNotVisibleSearch}
          >
            <IoIosSearch />
          </Button>

          <Button>
            <Links url="/waitlist" className={linkDarkTheme}>
              <FaRegHeart />
            </Links>
            <span className={style.count}>{waitListItems}</span>
          </Button>
          <Button>
            <Links url="/cart" className={linkDarkTheme}>
              <IoCartOutline />
            </Links>
            <span className={style.count}>{cartList}</span>
          </Button>
          <Button
            onClick={handleOnThemeChange}
            className={buttonRotateDarkTheme}
          >
            {theme ? (
              <MdLightMode className={style.sun} />
            ) : (
              <PiMoonFill className={style.moon} />
            )}
          </Button>
        </div>
      </header>

      {search && (
        <SearchItems
          handleOnVisibleSearch={handleOnVisibleSearch}
          handleOnRemoveSearchBox={handleOnRemoveSearchBox}
          autoFocus={search}
        />
      )}
    </>
  );
};

export default memo(Header);
