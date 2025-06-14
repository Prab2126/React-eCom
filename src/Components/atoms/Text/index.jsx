import classMixer from "../../../Utils/Mix-class";

import style from "./style.module.scss";

const contantTag = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  span: "span",
  label: "label",
  p: "p",
};

const Text = (props) => {
  const {
    variant = "p",
    parentStyle = null,
    children,
    className = "",
    secondClassName = null,
    ...rest
  } = props || {};

  const classs = classMixer(parentStyle ?? style, className);

  const Tag = contantTag[variant];

  return (
    <Tag {...rest} className={classs ?? secondClassName ?? ""}>
      {children}
    </Tag>
  );
};

Text.class = {
  USERICON: "userIcon",
  TAG: "tag",
  DARKGREEN: "dark-green",
  DARKGRAY: "darkGray",
  GREEN: "green",
  RED: "red",
  GRAY: "gray",
  STRICK: "strick",
  STAR: "star",
  USERTITLE: "userTitle",
  EMAIL: "email",
  FACEPRICE: "fackPrice",
};

export default Text;
