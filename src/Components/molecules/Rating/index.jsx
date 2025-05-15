import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import Text from "../../atoms/Text";

const Rating = ({ star = 1 }) => {
  const stars = [];

  for (let count = 1; count <= 5; count++) {
    stars.push(
      <Text key={count} className={Text.class.STAR}>
        {star >= count ? <FaStar /> : <FaRegStar />}
      </Text>
    );
  }
  return (
    <Text className="star-area" variant="h3">
      {stars.map((star) => star)}
    </Text>
  );
};

export default Rating;
