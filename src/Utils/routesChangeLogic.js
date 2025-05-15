import filterByCategory from "./filterByCategory";

const routesChangeLogic = ({ params }) => {
  const elementName =
    params?.value || params?.items || location.pathname.slice(1);

  const jsonData = localStorage.getItem("data");

  const data = JSON.parse(jsonData);

  return filterByCategory(elementName, data);
};

export default routesChangeLogic;
