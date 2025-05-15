const nestedObject = (data, dataName = "data", rest) => {
  if (!Array.isArray(data)) data = data.split("");

  const dataValue = data.map((e) => {
    const id = new Date().getTime();

    return { id, [dataName]: e, ...rest };
  });
  return dataValue;
};

export default nestedObject;
