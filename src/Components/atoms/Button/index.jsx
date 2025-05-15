import classMixer from "../../../Utils/Mix-class";

import style from "./style.module.scss";

const Button = (props) => {
  const {
    onClick = () => {},
    className = "",
    children = "",
    id = 1,
    disabled = false,
    css,
  } = props || {};

  const classNames = classMixer(style, className);

  return (
    <button
      disabled={disabled}
      data-id={id}
      className={classNames}
      onClick={onClick}
      style={css}
    >
      {children}
    </button>
  );
};

Button.class = {
  PAGE_NATION: "page-nation",
  CART: "cart",
  CART_CONTROLLER: "cart-controller",
  CONTROLLER: "controller",
  PRICE_FILTER: "price-filter",
  NEWSLETTER_BTN: "newsletterBtn",
  ITEMS_FILTER: "items-filter",
};

export default Button;
