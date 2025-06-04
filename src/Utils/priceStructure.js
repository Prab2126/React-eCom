function priceStructure(price = "") {
  const stringInPrice = String(Math.floor(price));

  const currectlength = stringInPrice.length - 1;

  let count = currectlength % 2 == 0 ? 1 : 0;
  let indiaPrice = "";

  for (let i = 0; i <= currectlength; i++) {
    const value = stringInPrice[i];

    if (currectlength < 3) indiaPrice += value;
    else if (i == count) {
      indiaPrice += `${value},`;
      count += 2;
      if (i === currectlength - 3) count += 3;
    } else indiaPrice += value;
  }

  return indiaPrice;
}

export default priceStructure;
