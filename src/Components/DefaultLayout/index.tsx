import React, {useEffect} from "react";
import Navbar from "@/Components/Navbar";
import ThemeBtn from "@/Components/ThemeBtn";
import {useAppSelector} from "@/utils/store/hooks";

import styles from "./index.module.scss";

const DefaultLayout: React.FC<{ children: any }> = ({children}) => {
    const darkModel = useAppSelector((state) => state.user.darkModel);
    useEffect(() => {
        const content = document.getElementsByTagName("body")[0];
        content.setAttribute("class", darkModel ? "darkModel" : "lightModel");
    }, []);
    return (
        <div className={styles.defaultLayout}>
            {darkModel && <div className={styles.darkLayer}/>}
            <div className={styles.main}>
                <Navbar/>
                {children}
            </div>
            <ThemeBtn/>
        </div>
    );
};

export default DefaultLayout;
