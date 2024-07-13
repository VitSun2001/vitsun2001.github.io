import styles from "../Modal/Modal.module.scss";
import {ReactNode, useEffect, useRef} from "react";
import {IconCross} from "../Icons/IconCross.tsx";

interface ModalProps {
    label?: string,
    open: boolean,
    onClose?: () => void,
    className?: string
    children: ReactNode | ReactNode[]
}

export function Modal({label, open, onClose, className, children}: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open)
            ref.current?.showModal();
        else {
            ref.current?.close();
        }
    }, [open]);

    return (
        <dialog className={`${styles.dialog} ${className}`} ref={ref} onClose={onClose}>
            <button className={styles.close} onClick={onClose}>
                <IconCross size={"1.375rem"}></IconCross>
            </button>
            {label ? <h2 className={styles.label}>{label}</h2> : ""}
            {children}
        </dialog>
    )
}