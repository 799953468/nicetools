import React, {useEffect, useRef, useState} from "react";
import styles from "./index.module.scss";
import SvgIcon from "@/Components/SvgIcon";

const Search = () => {
    const searchInput = useRef(null);
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
            // @ts-ignore
            searchInput?.current?.focus();
        }
    };
    return (
        <div className={styles.search_component}>
            <div className={`${styles.search} ${focus ? styles.focus : ""}`}>
                <div style={{marginLeft: "15px"}}>
                    <SvgIcon name="Magnifying" size={25}/>
                </div>
                <input
                    ref={searchInput}
                    type="search"
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    placeholder="搜索工具(Ctrl+F)"
                />
            </div>
        </div>
    );
};

export default Search;
