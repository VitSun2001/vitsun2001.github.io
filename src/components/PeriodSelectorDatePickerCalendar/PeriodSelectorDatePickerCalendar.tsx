// import styles from "./DateSelectorCalendar.module.scss"
// import {useContext} from "react";
// import CalendarContext, {CalendarContextType} from "../../contexts/CalendarContext.tsx";
// import {weekDayNames} from "../../constants/dateTime.ts";
// import {PeriodSelectorDatePickerCalendarDay} from "../PeriodSelectorDatePickerCalendarDay/PeriodSelectorDatePickerCalendarDay.tsx";
// import DateSelectorContext, {DateSelectorContextType} from "../../contexts/DateSelectorContext.tsx";
//
// interface PeriodSelectorDatePickerCalendarProps {
//     onDateClicked: () => void
// }
//
// export function PeriodSelectorDatePickerCalendar({onDateClicked}: PeriodSelectorDatePickerCalendarProps) {
//     const calendarContext = useContext(DateSelectorContext) as DateSelectorContextType
//
//
//     return <div className={styles.calendar}>
//         {weekDayNames.map((weekDayName) => (
//             <div className={styles.weekday}>
//                 {weekDayName}
//             </div>
//         ))}
//         {calendarContext.days.map(day => (
//             <PeriodSelectorDatePickerCalendarDay
//                 date={day}
//                 onSelect={() => {}}
//                 currentMonth={day.getMonth() == calendarContext.selectedMonth && day.getFullYear() == calendarContext.selectedYear}
//             >
//             </PeriodSelectorDatePickerCalendarDay>
//         ))
//         }
//     </div>
// }