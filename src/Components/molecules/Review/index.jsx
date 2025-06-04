import { memo, useState } from "react";

import { useThemeContext } from "../../../Context/ThemeProvider";

import Text from "../../atoms/Text";
import Input from "../../atoms/Input";
import Rating from "../../molecules/Rating";
import Button from "../../atoms/Button";
import Comment from "../Comment";

import style from "./style.module.scss";

const Review = (props) => {
  const { comments = [], setComments = () => {} } = props || {};

  const [formInput, setFormInput] = useState({
    name: "",
    email: "",
    describe: "",
    rating: 0,
  });

  const { maxofDescribe, maxofName } = { maxofDescribe: 100, maxofName: 20 };

  const { name = "", email = "", describe = "", rating = 0 } = formInput || {};

  const handleOnChangeInputField = ({ target }) => {
    const { dataset, value } = target || {};
    const currentInput = dataset.workofinput;

    const finalCorrectValue =
      currentInput === "name"
        ? value.length < maxofName
          ? value
          : name
        : currentInput === "describe"
        ? value.length <= maxofDescribe
          ? value
          : describe
        : value;

    setFormInput((prev) => ({
      ...prev,
      [currentInput]: finalCorrectValue,
    }));
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const isAllField = Object.values(formInput).every(
      (value) => isFinite(value) || value?.trim() !== ""
    );
    const isNamePresent = comments.some(
      ({ reviewerName, reviewerEmail } = {}) =>
        reviewerName === name || reviewerEmail === email
    );
    if (isNamePresent) alert("name  or email already present");
    else if (isAllField) {
      setComments((prev) => [
        ...prev,
        {
          comment: describe,
          date: new Date(),
          reviewerName: name,
          reviewerEmail: email,
          rating: rating,
        },
      ]);

      setFormInput({
        name: "",
        email: "",
        describe: "",
      });
    } else alert("fill your requied fields to submit");
  };

  const handleOnClick = ({ target }) => {
    const { tagName } = target || {};
    const { dataset } = /path/.test(tagName)
      ? target.parentElement.parentElement
      : /svg/.test(tagName)
      ? target.parentElement
      : target;

    const idInNum = Number(dataset?.id);
    setFormInput((prev) => ({ ...prev, rating: idInNum ?? rating }));
  };

  const renderComments = (comments) =>
    comments?.map(({ date, rating, reviewerName, comment } = {}, i) => (
      <Comment
        rate={rating}
        key={i}
        description={comment}
        userName={reviewerName}
        date={date}
      />
    ));

  const { theme } = useThemeContext() || {};

  const nightMod = theme ? "" : "inDarkMod";

  const maxedDescribed = {
    color: describe.length === maxofDescribe ? "red" : "",
  };

  return (
    <div className={`${style.reviewingArea} ${style[nightMod]}`}>
      <form onSubmit={handleOnSubmit} className={style.reviewAdder}>
        <Text variant="label">Add a Review</Text>

        <Rating controlling={true} star={rating} onClick={handleOnClick} />

        <Text htmlFor="discribe" variant="label">
          Describe*
        </Text>
        <div className={style.describeArea}>
          <Input
            onChange={handleOnChangeInputField}
            placeholder="type your thought"
            value={describe}
            id="discribe"
            inputField="textArea"
            workOfInput="describe"
            autoFocus={true}
          />

          <Text style={maxedDescribed}>
            {describe.length} / {maxofDescribe}
          </Text>
        </div>
        <Text htmlFor="name" variant="label">
          Name*
        </Text>
        <Input
          onChange={handleOnChangeInputField}
          value={name}
          id="name"
          placeholder="type your name"
          workOfInput="name"
        />

        <Text htmlFor="email" variant="label">
          Email*
        </Text>
        <Input
          onChange={handleOnChangeInputField}
          id="email"
          value={email}
          placeholder="type your email"
          workOfInput="email"
          type="email"
        />

        <Button className="cart">Submit</Button>
      </form>
      <div className={style.commentsArea}>{renderComments(comments)}</div>
    </div>
  );
};

export default memo(Review);
