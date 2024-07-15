import styles from "./CalendarWeekday.module.scss"

interface CalendarWeekdayProps {
    day: string
}

export function CalendarWeekday({day}: CalendarWeekdayProps) {
    return (
        <h3 className={styles.day}>{day}</h3>
    )
}