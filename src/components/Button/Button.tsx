import styles from './Button.module.scss'
import {ReactNode} from "react";

interface ButtonProps {
    color: "red" | "black",
    onClick?: () => void,
    secondary?: boolean,
    disabled?: boolean
    children: ReactNode | ReactNode[]
}

export function Button({color, onClick, secondary, disabled, children}: ButtonProps) {
    const colorStyle = (() => {
        switch (color) {
            case "red":
                return styles.red;
            case "black":
                return styles.black;
        }
    })()
    const secondaryStyle = secondary ? styles.secondary : "";
    const disabledStyle = disabled ? styles.disabled : "";
    return (
        <button
            disabled={disabled}
            className={`${styles.button} ${colorStyle} ${secondaryStyle} ${disabledStyle}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}