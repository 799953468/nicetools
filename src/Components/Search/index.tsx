import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import { Input, InputRef } from "antd";
import { setSearchText } from "@/utils/store/reducer/usersReducer";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((state) => state.user.searchText);
  const searchInput = useRef<InputRef>(null);
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    window.addEventListener("keydown", keyDown);
  }, []);

  const keyDown = (e: {
    keyCode: number;
    ctrlKey: any;
    preventDefault: () => void;
  }) => {
    if (e.keyCode == 70 && e.ctrlKey) {
      e.preventDefault();
      searchInput.current!.focus();
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log("Change:", e.target.value);
    dispatch(setSearchText(e.target.value));
  };

  return (
    <div className={styles.search_component}>
      <div className={`${styles.search} ${focus ? styles.focus : ""}`}>
        <div style={{ marginLeft: "15px" }}>
          <SearchOutlined
            height="20px"
            width="20px"
            color={focus ? "white" : "black"}
          />
        </div>
        <Input
          ref={searchInput}
          type="search"
          value={searchText}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="搜索工具(Ctrl+F)"
        />
      </div>
    </div>
  );
};

export default Search;
