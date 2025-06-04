import { memo } from "react";

import style from "./style.module.scss";

const Loader = () => {
  return (
    <main className={style.loader}>
      <div className={style.loading}></div>
    </main>
  );
};

export default memo(Loader);
