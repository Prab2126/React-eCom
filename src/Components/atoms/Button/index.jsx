import classMixer from "../../../Utils/Mix-class";

import style from "./style.module.scss";

const Button = (props) => {
  const {
    onClick = () => {},
    className = "",
    children = "",
    id = null,
    imgurl = null,
    disabled = false,
    css,
    isallperest = null,
    parentStyle = null,
    workofbtn = null,
  } = props || {};

  const classNames = classMixer(parentStyle ?? style, className);

  return (
    <button
      disabled={disabled}
      data-id={id}
      data-workofbtn={workofbtn}
      data-isallperest={isallperest}
      data-imgurl={imgurl}
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
  STAR: "star",
};

export default Button;
