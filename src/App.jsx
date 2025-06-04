import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import useProductContext from "./Context/Product-provider";
import LogicProvider from "./Context/LogicProvider";
import ThemeContextProvider from "./Context/ThemeProvider";

import BasicLayout from "./Layout";
import Error from "./Pages/Error";

import Loader from "./Components/molecules/Loader";
import All_catgory from "./Pages/All_catgory";
import Cart from "./Pages/Cart";
import WaitList from "./Pages/WaitList";
import Item_info from "./Pages/Item_info";

import fetch_data from "./Utils/fetch_data";
import routesChangeLogic from "./Utils/routesChangeLogic";
import filterByCategory from "./Utils/filterByCategory";

async function storeInLocalStorage(setState) {
  const fetchedData = await fetch_data();
  const haveToaddInLocalStorage = fetchedData?.length >= 5;

  const catogryData = filterByCategory(null, fetchedData, "takeAllData");

  if (haveToaddInLocalStorage) {
    const jsonData = JSON.stringify(catogryData);
    localStorage.setItem("data", jsonData);
  }
  setState(true);
}

const App = () => {
  const isPresentInLocal = Boolean(localStorage.getItem("data")?.length);

  const [check, setCheck] = useState(isPresentInLocal);

  useEffect(() => {
    if (!check) storeInLocalStorage(setCheck);
  }, [check]);

  const { dispatch } = useProductContext() || {};

  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("data")) ?? [];
    const waitListItems = localData?.filter((item) => item?.waitList);
    const cartItems = localData?.filter((item) => item?.cart);
    const someKeyAddedCart = cartItems?.map((item) => ({
      ...item,
      isAdded: true,
    }));
    const someKeyAddedWaitList = waitListItems?.map((item) => ({
      ...item,
      isAdded: true,
    }));
    dispatch({
      type: "UPDATE-CART-AT-ONETIME",
      payload: { item: someKeyAddedCart },
    });
    dispatch({
      type: "UPDATE-WAITLIST-AT-ONETIME",
      payload: { item: someKeyAddedWaitList },
    });
  }, []);

  const routes = createBrowserRouter([
    {
      element: <BasicLayout />,
      path: "/",
      errorElement: <Error />,
      children: [
        {
          element: <All_catgory />,
          path: "category/:value",
          loader: routesChangeLogic,
        },
        {
          element: <Item_info />,
          path: "category/:items/details/:id",
          loader: routesChangeLogic,
        },

        {
          element: <Cart />,
          path: "cart",
          loader: routesChangeLogic,
        },

        {
          element: <WaitList />,
          path: "waitlist",
          loader: routesChangeLogic,
        },
      ],
    },
  ]);
  return check ? (
    <ThemeContextProvider>
      <LogicProvider>
        <RouterProvider router={routes} />
      </LogicProvider>
    </ThemeContextProvider>
  ) : (
    <Loader />
  );
};

export default App;
