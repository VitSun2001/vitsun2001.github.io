// import styles from "./PeriodSelectorDatePickerControls.module.scss"
// import {monthNames} from "../../constants/dateTime.ts";
// import {useContext} from "react";
// import CalendarContext, {CalendarContextType} from "../../contexts/CalendarContext.tsx";
// import DateSelectorContext from "../../contexts/DateSelectorContext.tsx";
//
//
// export function PeriodSelectorDatePickerControls() {
//     const calendarContext = useContext(DateSelectorContext) as CalendarContextType
//
//     return <div className={styles.container}>
//         <button className={styles.arrow} onClick={calendarContext.decrementMonth}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M15 19L8.70711 12.7071C8.31658 12.3166 8.31658 11.6834 8.70711 11.2929L15 5" stroke="#0D0C0C"
//                       stroke-width="2" stroke-linecap="round"/>
//             </svg>
//         </button>
//         <h4 className={styles.selectedMonth} >{monthNames[calendarContext.selectedMonth]} {calendarContext.selectedYear}</h4>
//         <button className={styles.arrow} onClick={calendarContext.incrementMonth}>
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M9 5L15.2929 11.2929C15.6834 11.6834 15.6834 12.3166 15.2929 12.7071L9 19" stroke="#0D0C0C"
//                       stroke-width="2" stroke-linecap="round"/>
//             </svg>
//         </button>
//     </div>
// }