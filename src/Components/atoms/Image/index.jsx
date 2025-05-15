const Image = (props) => {
  const {
    onClick = () => {},
    width = "30px",
    height = "50px",
    id = 0,
    alt = "not found",
    onMouseMove = () => {},
    isClicked = false,
    src = null,
    ...rest
  } = props || {};

  const border = isClicked ? "1px solid black" : "";

  return (
    <img
      onClick={onClick}
      width={width}
      data-id={id}
      style={{ border: border }}
      onMouseMove={onMouseMove}
      height={height}
      loading="lazy"
      alt={alt}
      src={src}
      {...rest}
    />
  );
};
export default Image;
