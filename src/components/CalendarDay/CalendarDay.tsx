import styles from "./CalendarDay.module.scss"
import {CalendarDayEvent} from "../CalendarDayEvent/CalendarDayEvent.tsx";

interface CalendarGridWeekdayProps {
    day: string
    currentMonth?: boolean,
    weekend?: boolean
}

export function CalendarDay({day, currentMonth, weekend}: CalendarGridWeekdayProps) {
    const currentMonthStyle = currentMonth ? styles.currentMonth : "";
    const weekendStyle = weekend ? styles.weekend : "";
    return (
        <div className={`${styles.day} ${weekendStyle} ${currentMonthStyle}`}>
            <p className={`${styles.date} ${currentMonthStyle}`}>{day}</p>
            <div className={styles.events}>
                <CalendarDayEvent label={"Музыкальный опен-эйр фестиваль"} type={"future"}></CalendarDayEvent>
                <CalendarDayEvent label={"Музыкальный опен-эйр фестиваль"} type={"future"}></CalendarDayEvent>
            </div>
        </div>
    )
}