import styles from "./CalendarDay.module.scss"
import {CalendarDayEvent} from "../CalendarDayEvent/CalendarDayEvent.tsx";

interface CalendarDayProps {
    day: Date
    events: Array<any>,
    currentMonth?: boolean,
    weekend?: boolean,
    onClick: (event: any) => void
}

export function CalendarDay({day, events, currentMonth, weekend, onClick}: CalendarDayProps) {
    const currentMonthStyle = currentMonth ? styles.currentMonth : "";
    const weekendStyle = weekend ? styles.weekend : "";

    const eventComponents = events.map(x=> <CalendarDayEvent
        label={x.title}
        type={(Date.parse(x.dateStart) < new Date().getTime() && !x.dateEnd) || (x.dateEnd && Date.parse(x.dateEnd) < new Date().getTime()) ? "past" : x.owner ? "created" : x.participants.length > 0 ? "accede" : "future"}
        onClick={()=>{onClick(x);}}
    />)

    return (
        <div className={`${styles.day} ${weekendStyle} ${currentMonthStyle}`}>
            <p className={`${styles.date} ${currentMonthStyle}`}>{day.getDate()}</p>
            <div className={styles.events}>
                {eventComponents}
            </div>
        </div>
    )
}