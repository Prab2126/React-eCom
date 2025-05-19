function correctNumbering(num, itemLength) {
  return {
    max_count: num,
    itemLength: Math.floor(
      itemLength % num ? itemLength / num : itemLength / num - 1
    ),
  };
}

export default correctNumbering;
