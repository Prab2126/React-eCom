import { memo, useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import Image from "../../atoms/Image";
import Button from "../../atoms/Button";

import useCount from "../../../Hooks/useCount";

import style from "./style.module.scss";

const ImgPreView = (props) => {
  const { img = [], maxImg = 0, isToView = false } = props || {};

  const [imgPreView, setImgPreView] = useState(isToView);

  const {
    count,
    handleOnPrevious,
    handleOnNext,
    stop_Previous_Btn,
    stop_Next_Btn,
  } = useCount(maxImg, 0);

  const imageURL = img[count];

  const handleOnRemove = () => {
    setImgPreView(false);
  };

  return (
    imgPreView && (
      <aside className={style.imgPreview}>
        <Button onClick={handleOnPrevious} disabled={stop_Previous_Btn}>
          <FaArrowCircleLeft />
        </Button>

        <div className={style["img-area"]}>
          <Button onClick={handleOnRemove}>
            <ImCross />
          </Button>
          <Image src={imageURL} alt="Check your internet " />
        </div>

        <Button onClick={handleOnNext} disabled={stop_Next_Btn}>
          <FaArrowCircleRight />
        </Button>
      </aside>
    )
  );
};

export default memo(ImgPreView);
