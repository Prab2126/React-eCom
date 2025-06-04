import { memo } from "react";
import { useNavigate } from "react-router-dom";

import Links from "../../Components/atoms/Links";
import Button from "../../Components/atoms/Button";

const Error = () => {
  const goBack = useNavigate();

  const handleOnGoBack = () => {
    goBack(-1);
  };

  return (
    <main>
      <div>
        <Button>
          <Links url="/">Home page</Links>
        </Button>
        <Button onClick={handleOnGoBack}>Go Back</Button>
      </div>
    </main>
  );
};
export default memo(Error);
