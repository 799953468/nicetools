import React from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <header>
        <h1 className={styles.title}>
          <Link to={"/"}>MikuTools - 工具合集</Link>
        </h1>
      </header>
    </div>
  );
};

export default Navbar;
