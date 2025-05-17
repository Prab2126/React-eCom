import { memo } from "react";
import classMixer from "../../../Utils/Mix-class";

import style from "./style.module.scss";

const InputArea = (props) => {
  const {
    value,
    inputField = "input",
    type = "text",
    onChange = () => {},
    className = "",
    required = true,
    autoFocus = false,
    placeholder = "",
    max = 1,
    min = 0,
  } = props || {};

  const classNames = classMixer(style, className);

  return inputField === "input" ? (
    <input
      type={type}
      autoFocus={autoFocus}
      required={required}
      placeholder={placeholder}
      value={value}
      className={classNames}
      onChange={onChange}
      max={max}
      min={min}
    />
  ) : (
    <textarea
      value={value}
      required={required}
      autoFocus={autoFocus}
      className={classNames}
      placeholder={placeholder}
      onChange={onChange}
    ></textarea>
  );
};

export default memo(InputArea);
