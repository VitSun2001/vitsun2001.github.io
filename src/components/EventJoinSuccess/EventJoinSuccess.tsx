import styles from './EventJoinSuccess.module.scss'
import {Modal} from "../Modal/Modal.tsx";
import {Button} from "../Button/Button.tsx";

interface CalendarDayEventJoinSuccessProps {
    open: boolean
    event: any
    onClose: () => void
}

export function EventJoinSuccess({open, event, onClose}: CalendarDayEventJoinSuccessProps) {
    return (
        <Modal open={open} onClose={onClose} className={styles.handBackground}>
            <div className={styles.container}>
                <div>
                    <h2 className={styles.title}>Поздравляем!</h2>
                    <h4 className={styles.subtitle}>Вы теперь участник события:</h4>
                    <h4 className={`${styles.subtitle}  ${styles.accent}`}>{event.name}</h4>
                </div>
                <div>
                    <div className={styles.date}>
                        <span className={styles.date}>{new Intl.DateTimeFormat("ru", {
                            weekday: "long"
                        }).format(new Date(event.dateStart))}</span>
                        <span className={styles.divider}></span>
                        <span className={styles.date}>{new Intl.DateTimeFormat("ru", {
                            day: "numeric",
                            month: "long"
                        }).format(new Date(event.dateStart))}</span>
                        <span className={styles.divider}></span>
                        <span className={styles.date}>{new Intl.DateTimeFormat("ru", {
                            hour: "2-digit",
                            minute: "2-digit"
                        }).format(new Date(event.dateStart))}</span>
                    </div>
                    <h4 className={styles.location}>{event.location}</h4>
                </div>
                <Button color={"black"} onClick={onClose}>Отлично</Button>
            </div>
        </Modal>
    );
}