import styles from "./CalendarDay.module.scss"
import {CalendarDayEvent} from "../CalendarDayEvent/CalendarDayEvent.tsx";

interface CalendarGridWeekdayProps {
    day: Date
    events: Array<any>,
    currentMonth?: boolean,
    weekend?: boolean
}

export function CalendarDay({day, events, currentMonth, weekend}: CalendarGridWeekdayProps) {
    const currentMonthStyle = currentMonth ? styles.currentMonth : "";
    const weekendStyle = weekend ? styles.weekend : "";

    const eventComponents = events.map(x=> <CalendarDayEvent label={x.title} type={Date.now() > Date.parse(x.dateEnd) ? "past" : "future"}/>)

    return (
        <div className={`${styles.day} ${weekendStyle} ${currentMonthStyle}`}>
            <p className={`${styles.date} ${currentMonthStyle}`}>{day.getDate()}</p>
            <div className={styles.events}>
                {eventComponents}
            </div>
        </div>
    )
}