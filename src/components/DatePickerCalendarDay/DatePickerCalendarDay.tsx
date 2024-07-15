import styles from "./DatePickerCalendarDay.module.scss"

interface DatePickerCalendarDayProps {
    date: Date,
    currentMonth?: boolean,
    endpoint?: boolean,
    interval?: boolean
    onSelect: () => void
}

export function DatePickerCalendarDay({date, currentMonth, endpoint, interval, onSelect}: DatePickerCalendarDayProps) {
    return <p onClick={onSelect} className={`${styles.day} ${currentMonth ? styles.currentMonth : ""} ${interval ? styles.interval : ""} ${endpoint ? styles.endpoint: ""}`}>{date.getDate()}</p>
}
