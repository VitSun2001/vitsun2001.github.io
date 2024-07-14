import {Modal} from "../Modal/Modal.tsx";
import styles from "./ModalConfirm.module.scss"
import {Button} from "../Button/Button.tsx";

interface ModalConfirmProps {
    open: boolean
    label: string
    onClose: () => void
    onConfirm: () => void
}

export function ModalConfirm({open, label, onClose, onConfirm}: ModalConfirmProps) {
    return (
        <Modal open={open} onClose={onClose} className={styles.pigeonBackground} >
            <h4 className={styles.label}>{label}</h4>
            <div className={styles.container}>
                <Button color={"black"} onClick={onClose} secondary><div style={{width: "3rem"}}>Нет</div></Button>
                <Button color={"black"} onClick={onConfirm}><div style={{width: "3rem"}}>Да</div></Button>
            </div>
        </Modal>
    );
}