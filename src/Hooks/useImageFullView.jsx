import { useState } from "react";

const useImageFullView = (images, setPreview, zoom = 1) => {
  const handleOnClickRemove = () => {
    setPreview((prev) =>
      typeof prev == "object" ? { ...prev, isPreviewing: false } : false
    );
  };

  const [changePosition, setChangePosition] = useState({
    position: "309px 383px ",
    scale: zoom,
  });

  const styling = {
    transformOrigin: `${changePosition.position}`,
    transform: `scale(${changePosition.scale})`,
    cursor: changePosition.scale === 3 ? "zoom-out" : "zoom-in",
  };

  function setPosition(nativeEvent, isScale) {
    const { offsetX, offsetY } = nativeEvent || {};

    setChangePosition((prev) => ({
      scale: isScale === "scale" ? 3 : prev.scale == 3 ? zoom : 3,
      position: `${offsetX}px ${offsetY}px`,
    }));
  }

  const handleOnMouseMove = ({ nativeEvent } = {}) => {
    if (changePosition.scale == 3) {
      setPosition(nativeEvent, "scale");
    }
  };

  const handleOnImgZoom = ({ nativeEvent } = {}) => {
    setPosition(nativeEvent);
  };

  const maxValue = Array.isArray(images) ? images.length - 1 : 0;
  return {
    maxValue,
    handleOnClickRemove,
    handleOnImgZoom,
    handleOnMouseMove,
    styling,
  };
};
export default useImageFullView;
