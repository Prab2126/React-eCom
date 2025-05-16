const classMixer = (style, className) => {
  className = className?.trim();
  const string_array = className?.split(" ");

  if (string_array.length === 1) return style[className];

  const final_value = string_array?.map((e) => style?.[e])?.join(" ");
  return final_value;
};

export default classMixer;
