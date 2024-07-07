import styles from "./CalendarWeekday.module.scss"

interface CalendarGridWeekdayProps {
    day: string
}

export function CalendarWeekday({day}: CalendarGridWeekdayProps) {
    return (
        <h3 className={styles.day}>{day}</h3>
    )
}