import { memo } from "react";

import ImageFullView from "../ImageFullView";
import Image from "../../atoms/Image";

import useProductShow from "../../../Hooks/useProductShow";

import style from "./style.module.scss";

const ProductShowCase = (props) => {
  const { thumbnail = "", images = [] } = props || {};

  const {
    imgRendering,
    handleOnClickShowFullPrev,
    modifiyImages,
    img,
    setImg,
  } = useProductShow(images, thumbnail);

  return (
    <div className={style["picture-view"]}>
      <ImageFullView
        images={images}
        dataset={img?.dataset}
        isPreviewing={img?.isPreviewing}
        setPreview={setImg}
      />
      <picture>
        <Image
          src={img?.img}
          width="100%"
          height="100%"
          onClick={handleOnClickShowFullPrev}
        />
      </picture>
      <div className={style.images}>{imgRendering(modifiyImages)}</div>
    </div>
  );
};

export default memo(ProductShowCase);
