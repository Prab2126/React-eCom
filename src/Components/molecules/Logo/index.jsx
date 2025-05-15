import { memo } from "react";

import Text from "../../atoms/Text";

const Logo = (props) => {
  const { theme } = props || {};
  const darkTheme = theme ? "" : "darkTheme";
  return (
    <Text variant="h1" className={darkTheme}>
      PRABHU
      <Text variant="span" className={Text.class.GREEN}>
        .
      </Text>
    </Text>
  );
};

export default memo(Logo);
