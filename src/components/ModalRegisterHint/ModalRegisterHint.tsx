import styles from "./ModalRegisterHint.module.scss"
import {IconInfo} from "../Icons/IconInfo.tsx";

export function ModalRegisterHint() {
    return (
        <div className={styles.container}>
            <div className={styles.iconWrapper}>
                <IconInfo size={"1.125rem"}></IconInfo>
            </div>
            В пароле используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - &lt; &gt; @ [ ] { } / \ _ {} $ # )
        </div>
    );
}