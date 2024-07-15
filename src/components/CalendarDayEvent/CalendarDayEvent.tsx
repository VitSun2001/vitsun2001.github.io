import styles from './CalendarDayEvent.module.scss'
import {IconStar} from "../Icons/IconStar.tsx";
import {IconCircle} from "../Icons/IconCircle.tsx";

interface CalendarDayEventProps {
    label: string,
    type: "past" | "future" | "accede" | "created"
    onClick?: () => void
}

export function CalendarDayEvent({label, type, onClick}: CalendarDayEventProps) {

    const typeStyle = (() => {
        switch (type) {
            case "past":
                return styles.past;
            case "future":
                return styles.future;
            case "accede":
                return styles.accede;
            case "created":
                return styles.created;
        }
    })()

    const handleClick = () => {
        onClick?.()
    }

    return (
        <>
            <div className={`${styles.tag} ${typeStyle}`} onClick={handleClick}>
                <div className={styles.marker}>
                    {
                        type == "created" ?
                            <IconStar size={"0.875rem"}/>
                            : ""
                    }
                    {
                        type == "accede" ?
                            <IconCircle size={"0.5rem"} color={"#F51B1B"}/>
                            : ""
                    }
                </div>
                <div className={styles.content}>
                    {label}
                </div>
            </div>
        </>
    )
}