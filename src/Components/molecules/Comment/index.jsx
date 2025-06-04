import { memo } from "react";
import { FaUserCircle } from "react-icons/fa";

import Text from "../../atoms/Text";
import Rating from "../Rating";

import style from "./style.module.scss";

const Comment = (props) => {
  const {
    userName = "mohan",
    date = "aug 21,2020",
    rate = 0,
    description = "",
  } = props || {};

  const modifiedDate =
    typeof date === "object" ? date : date.toLowerCase().split("t")[0];

  const correctedDateFormate = new Date(modifiedDate)
    .toDateString()
    .split(" ")
    .slice(1)
    .join(" ");

  return (
    <aside className={style.comment}>
      <Text className={`${Text.class.USERICON} ${Text.class.GRAY}`}>
        {<FaUserCircle />}
      </Text>
      <div className={style.content}>
        <div className={style["user-details"]}>
          <div className={style["user-Name-Date"]}>
            <Text className={Text.class.USERTITLE}>{userName}</Text>
            <Text variant="span" className={Text.class.GRAY}>
              ~{correctedDateFormate}
            </Text>
          </div>
          {<Rating star={rate} />}
        </div>
        <Text>{description}</Text>
      </div>
    </aside>
  );
};

export default memo(Comment);
