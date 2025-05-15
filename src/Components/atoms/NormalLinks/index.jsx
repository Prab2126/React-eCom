const NormalLinks = (props) => {
  const { children, href = "", ...rest } = props || {};
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};

export default NormalLinks;
