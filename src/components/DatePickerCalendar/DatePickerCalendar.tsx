import styles from "./DatePickerCalendar.module.scss"
import {useContext} from "react";
import {weekDayNames} from "../../constants/dateTime.ts";
import {
    DatePickerCalendarDay
} from "../DatePickerCalendarDay/DatePickerCalendarDay.tsx";
import DateSelectorContext, {DateSelectorContextType} from "../../contexts/DateSelectorContext.tsx";

interface DatePickerCalendarProps {
    onDateClicked: (date: Date) => void
}

export function DatePickerCalendar({onDateClicked}: DatePickerCalendarProps) {
    const datePickerContext = useContext(DateSelectorContext) as DateSelectorContextType

    return <div className={styles.calendar}>
        {weekDayNames.map((weekDayName) => (
            <div className={styles.weekday}>
                {weekDayName}
            </div>
        ))}
        {datePickerContext.days.map(day => (
            <DatePickerCalendarDay
                date={day}
                onSelect={() => onDateClicked(day)}
                endpoint={(datePickerContext.beginDate
                        && day.getFullYear() == datePickerContext.beginDate.getFullYear()
                        && day.getMonth() == datePickerContext.beginDate.getMonth()
                        && day.getDate() == datePickerContext.beginDate.getDate())
                    ||
                    (datePickerContext.endDate
                        && day.getFullYear() == datePickerContext.endDate.getFullYear()
                        && day.getMonth() == datePickerContext.endDate.getMonth()
                        && day.getDate() == datePickerContext.endDate.getDate())
                }
                interval={
                    datePickerContext.beginDate
                    && datePickerContext.endDate
                    && day.getTime() > datePickerContext.beginDate.getTime()
                    && day.getTime() < datePickerContext.endDate.getTime()
                }
                currentMonth={day.getMonth() == datePickerContext.selectedMonth && day.getFullYear() == datePickerContext.selectedYear}
            >
            </DatePickerCalendarDay>
        ))
        }
    </div>
}