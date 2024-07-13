import {Modal} from "../Modal/Modal.tsx";
import styles from "./ModalError.module.scss"
import {Button} from "../Button/Button.tsx";

interface ModalErrorProps {
    open: boolean
    onClose: () => void
}

export function ModalError({open, onClose}: ModalErrorProps) {
    return (
        <Modal open={open} onClose={onClose} className={styles.pigeonBackground} >
            <div className={styles.container}>
                <div>
                    <h2 className={styles.title}>Что-то пошло не так</h2>
                    <h4 className={styles.subtitle}>Попробуйте позже</h4>
                </div>
                <Button label={"Хорошо"} color={"black"} onClick={onClose}></Button>
            </div>
        </Modal>
    );
}