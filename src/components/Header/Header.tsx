import styles from "./Header.module.scss"
import {HeaderControlsMonthSelector} from "../HeaderControlsMonthSelector/HeaderControlsMonthSelector.tsx";
import {HeaderLogo} from "../HeaderLogo/HeaderLogo.tsx";
import {HeaderControlsUser} from "../HeaderControlsUser/HeaderControlsUser.tsx";

export function Header() {
    return (
        <div className={styles.header}>
            <HeaderLogo/>
            <div className={styles.menu}>
                <HeaderControlsMonthSelector/>
                <HeaderControlsUser/>
            </div>
        </div>
    )
}