import { NavLink } from "react-router-dom";

import classMixer from "../../../Utils/Mix-class";

import style from "./style.module.scss";

const Links = (props) => {
  const {
    children,
    url = "",
    className = "",
    parentStyle = null,
    ...rest
  } = props || {};
  const classNames = classMixer(parentStyle ?? style, className);
  return (
    <NavLink to={url} className={classNames} {...rest}>
      {children}
    </NavLink>
  );
};

export default Links;
