// import styles from "./PeriodSelectorDatePicker.module.scss"
// import useCalendar from "../../hooks/useCalendar.tsx";
// import {PeriodSelectorDatePickerControls} from "../PeriodSelectorDatePickerControls/PeriodSelectorDatePickerControls.tsx";
// import {PeriodSelectorDatePickerCalendar} from "../PeriodSelectorDatePickerCalendar/PeriodSelectorDatePickerCalendar.tsx";
// import {Button} from "../Button/Button.tsx";
// import DateSelectorContext from "../../contexts/DateSelectorContext.tsx";
// import {useState} from "react";
//
// interface DateSelectorProps {
//     periodBegin: boolean
// }
//
// export function PeriodSelectorDatePicker() {
//     const calendar = useCalendar()
//     const [beginDate, setBeginDate] = useState<Date>()
//     const [endDate, setEndDate] = useState<Date>()
//
//     return <DateSelectorContext.Provider value={{...calendar, beginDate, endDate}}>
//         <div className={styles.selector}>
//             <PeriodSelectorDatePickerControls></PeriodSelectorDatePickerControls>
//             <PeriodSelectorDatePickerCalendar onDateClicked={() => {}}></PeriodSelectorDatePickerCalendar>
//             <Button color={"black"}>Применить</Button>
//         </div>
//     </DateSelectorContext.Provider>
// }