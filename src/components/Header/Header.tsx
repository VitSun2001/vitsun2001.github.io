import styles from "./Header.module.scss"
import {Button} from "../Button/Button.tsx";
import {HeaderControlsMonthSelector} from "../HeaderControlsMonthSelector/HeaderControlsMonthSelector.tsx";
import {HeaderLogo} from "../HeaderLogo/HeaderLogo.tsx";

export function Header() {
    return (
        <div className={styles.header}>
            <HeaderLogo/>
            <div className={styles.menu}>
                <HeaderControlsMonthSelector/>
                <Button label={"Войти"} color={"black"}></Button>
            </div>
        </div>
    )
}