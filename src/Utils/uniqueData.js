function uniqueData(data) {
  const tags = data.map((item) => item.tags[0]);
  return tags.filter((title, index) => tags.indexOf(title) == index);
}

export default uniqueData;
