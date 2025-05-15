import { memo } from "react";
import { FaUserCircle } from "react-icons/fa";

import Text from "../../atoms/Text";

import style from "./style.module.scss";

const Comment = (props) => {
  const {
    userName = "mohan",
    date = "aug 21,2020",
    rate = [],
    description = "",
  } = props || {};

  const star = rate.join("");

  return (
    <aside className={style.comment}>
      <Text className={`${Text.class.USERICON} ${Text.class.GRAY}`}>
        {<FaUserCircle />}
      </Text>
      <div className={style.content}>
        <div className={style["user-details"]}>
          <div>
            <Text className={Text.class.USERTITLE}>{userName}</Text>
            <Text className={Text.class.GRAY}>{date}</Text>
          </div>
          <Text className={Text.class.STAR}>{star}</Text>
        </div>
        <Text>{description}</Text>
      </div>
    </aside>
  );
};

export default memo(Comment);
