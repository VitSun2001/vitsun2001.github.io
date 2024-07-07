import styles from './CalendarDayEvent.module.scss'

interface EventTagProps {
    label: string,
    type: "past" | "future" | "accede" | "created"
    onClick?: () => void
}

export function CalendarDayEvent({label, type, onClick}: EventTagProps) {
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

    return (
        <div className={`${styles.tag} ${typeStyle}`} onClick={onClick}>
            <div className={styles.marker}>
                {
                    type == "created" ?
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 0C7 0 8.05062 3.10087 9.47487 4.52513C10.8991 5.94938 14 7 14 7C14 7 10.8991 8.05062 9.47487 9.47487C8.05062 10.8991 7 14 7 14C7 14 5.94938 10.8991 4.52513 9.47487C3.10087 8.05062 0 7 0 7C0 7 3.10087 5.94938 4.52513 4.52513C5.94938 3.10087 7 0 7 0Z"
                                fill="white"/>
                        </svg>
                        : ""
                }
                {
                    type == "accede" ?
                        < svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#F51B1B"/>
                        </svg>
                        : ""
                }
            </div>
            <div className={styles.content}>
                {label}
            </div>
        </div>
    )
}