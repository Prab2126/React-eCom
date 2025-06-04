import { memo } from "react";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";

import Button from "../../atoms/Button";
import Image from "../../atoms/Image";
import Counter from "../Counter";

import useImageFullView from "../../../Hooks/useImageFullView";

import style from "./style.module.scss";

const ImgFullView = (props) => {
  const {
    images = [],
    dataset = 0,
    zoom = 1,
    isPreviewing = false,
    setPreview = () => {},
  } = props || {};

  const {
    maxValue,
    handleOnClickRemove,
    handleOnImgZoom,
    handleOnMouseMove,
    styling,
  } = useImageFullView(images, setPreview, zoom);

  return (
    isPreviewing && (
      <Counter
        minVal={0}
        className={style.container}
        nextSym={<GrFormNextLink />}
        prevSym={<GrFormPreviousLink />}
        defaultValue={dataset}
        maxValue={maxValue}
      >
        {(count) => (
          <div className={style.imgController}>
            <Button className={style.close} onClick={handleOnClickRemove}>
              x
            </Button>
            <Image
              style={styling}
              onMouseMove={handleOnMouseMove}
              src={Array.isArray(images) ? images[count] : images}
              onClick={handleOnImgZoom}
              width="100%"
              height="100%"
            />
          </div>
        )}
      </Counter>
    )
  );
};

export default memo(ImgFullView);
