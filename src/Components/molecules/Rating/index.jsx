import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import Text from "../../atoms/Text";

import style from "./style.module.scss";

const demo = () => {};

const Rating = ({ star = 1, onClick = demo, controlling = false }) => {
  const stars = [];

  for (let count = 1; count <= 5; count++) {
    stars.push(
      <Text key={count} data-id={count} className={Text.class.STAR}>
        {star >= count ? <FaStar /> : <FaRegStar />}
      </Text>
    );
  }
  return (
    <div
      onClick={onClick}
      className={`${controlling ? style["ratingBox"] : ""} ${
        style["star-area"]
      }`}
    >
      {stars.map((star) => star)}
    </div>
  );
};

export default Rating;
