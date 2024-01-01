import React, { ReactElement } from "react";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const Container: React.FC<{
  title: string;
  icon?: ReactElement;
  list?: ListType[];
  children?: any;
}> = ({ title, icon, list, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <span className={styles.icon}>{icon}</span>
        <span>{title}</span>
      </div>
      {list && list?.length > 0 && (
        <div className={styles.tools}>
          {list.map((item) => {
            return (
              <Link key={nanoid()} to={item.path} className={styles.toolsBtn}>
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
      {children && children}
    </div>
  );
};

export default Container;
