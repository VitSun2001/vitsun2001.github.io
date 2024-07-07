import styles from "./Calendar.module.scss"
import {CalendarWeekday} from "../CalendarWeekday/CalendarWeekday.tsx";
import {CalendarDay} from "../CalendarDay/CalendarDay.tsx";

export function Calendar() {
    const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
    const days = ["30", "31", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const weekDaysComponents = weekDays.map(day => <CalendarWeekday day={day}/>)
    const daysComponents = days.map((day, index) =><CalendarDay day={day} weekend={index % 7 - 6 == 0 || index % 7 - 5 == 0}  currentMonth={index > 1 && index < 33} />)

    return (
        <div className={styles.calendar}>
            {weekDaysComponents}
            {daysComponents}
        </div>
    )
}