import { memo } from "react";

import { FaPhone } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io";

import { useThemeContext } from "../../Context/ThemeProvider";

import Text from "../../Components/atoms/Text";
import Input from "../../Components/atoms/Input";
import Logo from "../../Components/molecules/Logo";
import NormalLinks from "../../Components/atoms/NormalLinks";
import Button from "../../Components/atoms/Button";

import style from "./style.module.scss";

const handleOnSubmit = (event) => {
  event.preventDefault();
};

const Footer = () => {
  const { theme } = useThemeContext();

  const linkDarkTheme = theme ? "" : "darkTheme";
  return (
    <footer className={style[linkDarkTheme]}>
      <article>
        <div>
          <Logo theme={theme} />

          <Text className={Text.class.GRAY}>
            Prabhu is a mulltipurpose ecommerce tempelate, the spread of
            computers and layout programmes thus made dummy text better knows.
          </Text>

          <Text className={Text.class.GRAY}>
            <FaPhone /> +91 9572420289{" "}
          </Text>

          <Text className={`${Text.class.GRAY} ${Text.class.EMAIL}`}>
            <IoMdMailUnread /> javascript@hard.hai
          </Text>
        </div>

        <div>
          <Text variant="h3">Information</Text>

          <NormalLinks href="#">about us</NormalLinks>
          <NormalLinks href="#">contact us</NormalLinks>
          <NormalLinks href="#">blog</NormalLinks>
          <NormalLinks href="#">potfolio</NormalLinks>
          <NormalLinks href="#">my account</NormalLinks>
          <NormalLinks href="#">wishlist</NormalLinks>
        </div>

        <div>
          <Text variant="h3">Usefull Links</Text>
          <NormalLinks href="#">Privacy policy</NormalLinks>
          <NormalLinks href="#">shipping information</NormalLinks>
          <NormalLinks href="#">cart</NormalLinks>
          <NormalLinks href="#">checkout</NormalLinks>
          <NormalLinks href="#">my account</NormalLinks>
          <NormalLinks href="#">order tracking</NormalLinks>
        </div>

        <div>
          <Text variant="h3">our link</Text>
          <NormalLinks href="#">men</NormalLinks>
          <NormalLinks href="#">women</NormalLinks>
          <NormalLinks href="#">fashion</NormalLinks>
          <NormalLinks href="#">contact us</NormalLinks>
          <NormalLinks href="#">brand</NormalLinks>
          <NormalLinks href="#">accessories</NormalLinks>
          <NormalLinks href="#">beauty</NormalLinks>
        </div>

        <div>
          <Text variant="h3">signup for newsletter </Text>
          <Text className={Text.class.GRAY}>
            sign up for our newsletter to get the latest new, announcements and
            special
          </Text>
          <form onSubmit={handleOnSubmit}>
            <Input
              className="textInput"
              type="email"
              placeholder="Email Address"
            />
            <Button className={Button.class.NEWSLETTER_BTN}>GO</Button>
          </form>
        </div>
      </article>

      <div className={style.bottom}>
        <Text>
          &copy; 2018 prabhu shop, template by{" "}
          <Text variant="span" className={Text.class.GREEN}>
            nileforest
          </Text>
        </Text>
      </div>
    </footer>
  );
};

export default memo(Footer);
