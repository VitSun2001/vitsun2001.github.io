import styles from './Button.module.scss'

interface ButtonProps {
    label: string,
    color: "red" | "black",
    onClick?: () => void,
    secondary?: boolean,
    disabled?: boolean
}

export function Button({label, color, onClick, secondary, disabled}: ButtonProps) {
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
            {label}
        </button>
    )
}