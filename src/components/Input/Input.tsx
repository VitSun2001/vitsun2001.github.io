import styles from '../InputBase/InputBase.module.scss'
import {ChangeEvent, ReactElement} from "react";
import {IconProps} from "../Icons/IconProps.ts";

interface InputProps {
    label: string,
    value: string,
    type: "text" | "password" | "email"
    name: string,
    placeholder: string,
    disabled?: boolean
    onChange?: (value: string) => void,
    error: boolean,
    errorMessage: string,
    addonOnFocus?: boolean,
    addon?: ReactElement<IconProps>
    onAddonClick?: () => void
}

export function Input({
                          label,
                          value,
                          type,
                          name,
                          placeholder,
                          disabled,
                          onChange,
                          error,
                          errorMessage,
                          addonOnFocus,
                          addon,
                          onAddonClick
                      }: InputProps) {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.value)
    }

    return <div className={`${styles.labelGroup} ${error ? styles.error : ""}`}>
        <input
            className={styles.input}
            type={type}
            value={value}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            disabled={disabled}
        />
        <label className={styles.label}>{label}</label>
        <div className={`${styles.addon} ${addonOnFocus ? styles.addonOnFocus : ""}`  } onClick={onAddonClick}>{addon}</div>
        <div className={styles.errorMessage}>{errorMessage}</div>
    </div>
}