import { NavLink } from "react-router-dom";

import classMixer from "../../../Utils/Mix-class";

import style from "./style.module.scss";

const Links = (props) => {
  const { children, url = "", className = "", ...rest } = props || {};
  const classNames = classMixer(style, className);
  return (
    <NavLink to={url} className={classNames} {...rest}>
      {children}
    </NavLink>
  );
};

export default Links;
