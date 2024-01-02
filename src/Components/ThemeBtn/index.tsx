import React from "react";
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import styles from "./index.module.scss";
import { setDarkModel } from "@/utils/store/reducer/usersReducer";
import Sun from "@/assets/icon/sun.svg?component";
import Moon from "@/assets/icon/moon.svg?component";

const ThemeBtn = () => {
  const darkModel = useAppSelector((state) => state.user.darkModel);
  const dispatch = useAppDispatch();
  const changeModel = () => {
    dispatch(setDarkModel(!darkModel));
  };
  return (
    <div className={styles.themeBtn}>
      <div className={styles.line}></div>
      {darkModel ? (
        <div className={styles.typeIcon} onClick={changeModel}>
          <Sun color="white" />
        </div>
      ) : (
        <div className={styles.typeIcon} onClick={changeModel}>
          <Moon color="white" />
        </div>
      )}
    </div>
  );
};
export default ThemeBtn;
