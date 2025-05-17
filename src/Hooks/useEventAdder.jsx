import { useLogicContextProvider } from "../Context/LogicProvider";

const useEventAdder = () => {
  const {
    handleOnClickToRemoveCart,
    handleOnClickToAddWaitList,
    handleOnViewNow,
    handleOnClickToAddCart,
    handleOnClickToRemoveWaitList,
  } = useLogicContextProvider();

  const handleOnAllItemsClick = ({ target } = {}) => {
    const { tagName } = target;
    const { dataset } = /svg/.test(tagName) ? target.parentElement : target;

    switch (dataset.workofbtn) {
      case "search":
        handleOnViewNow({
          toShow: true,
          imgUrl: dataset.imgurl,
        });
        break;

      case "ADD-TO-CART":
        handleOnClickToAddCart(dataset);
        break;

      case "REMOVE-FROM-CART":
        handleOnClickToRemoveCart(dataset);

        break;
      case "ADD-TO-WAITLIST":
        handleOnClickToAddWaitList(dataset);
        break;
      case "REMOVE-FROM-WAITLIST":
        handleOnClickToRemoveWaitList(dataset);
        break;
    }
  };

  return handleOnAllItemsClick;
};

export default useEventAdder;
