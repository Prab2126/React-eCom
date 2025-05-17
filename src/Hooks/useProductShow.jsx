import { useEffect, useRef, useState } from "react";

import Image from "../Components/atoms/Image";

import style from "../Components/molecules/ProductShowCase/style.module.scss";

const useProductShow = (images, thumbnail) => {
  const modifiyImages = useRef();

  const [img, setImg] = useState();
  useEffect(() => {
    modifiyImages.current = images.map((src, i) => [src, i == 0]);

    setImg({
      img: thumbnail,
      dataset: 0,
      isPreviewing: false,
    });
  }, [images]);

  const handleOnClickImgChange = ({ target } = {}) => {
    const src = target?.src;
    const dataset = target?.dataset?.id;

    const isSelected = images.map((source) => [
      source,
      images.indexOf(source) == dataset,
    ]);

    setImg((prev) => ({ ...prev, img: src, dataset }));

    modifiyImages.current = isSelected;
  };

  const handleOnClickShowFullPrev = () => {
    setImg((prev) => ({ ...prev, isPreviewing: true }));
  };

  const imgRendering = (modifiyImages) => {
    const images = modifiyImages?.current || [];
    return images.map((array, i) => {
      const [src, isSelected] = array || [];

      return (
        <Image
          src={src}
          key={src}
          id={i}
          className={isSelected ? style["selected-Img"] : ""}
          onClick={handleOnClickImgChange}
          width="94px"
          height="100%"
        />
      );
    });
  };

  return {
    imgRendering,
    handleOnClickShowFullPrev,
    modifiyImages,
    img,
    setImg,
  };
};

export default useProductShow;
