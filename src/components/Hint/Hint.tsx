import styles from "./Hint.module.scss"
import {IconInfo} from "../Icons/IconInfo.tsx";
import {ReactElement} from "react";

interface HintProps{
    children: ReactElement | ReactElement[] | string
}

export function Hint({children}: HintProps) {
    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <IconInfo size={"1.125rem"}></IconInfo>
            </div>
            {children}
        </div>
    );
}