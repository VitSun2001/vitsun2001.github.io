import styles from "./DatePicker.module.scss"
import useCalendar from "../../hooks/useCalendar.tsx";
import {DatePickerControls} from "../DatePickerControls/DatePickerControls.tsx";
import {DatePickerCalendar} from "../DatePickerCalendar/DatePickerCalendar.tsx";
import {Button} from "../Button/Button.tsx";
import DateSelectorContext from "../../contexts/DateSelectorContext.tsx";
import {useState} from "react";

interface DatePickerProps {
    selectingStart: boolean
    onSelect: (start: Date, end: Date) => void
}

export function DatePicker({selectingStart, onSelect}: DatePickerProps) {
    const calendar = useCalendar()
    const [beginDate, setBeginDate] = useState<Date>(new Date(1720558800000))
    const [endDate, setEndDate] = useState<Date>(new Date(1721768400000))

    const handleDatePicked = (date: Date) => {
        if(selectingStart) {
            setBeginDate(date)
        }
        else {
            setEndDate(date)
        }
    }

    const handleSelect = () => {
        onSelect(beginDate, endDate)
    }

    return <DateSelectorContext.Provider value={{...calendar, beginDate, endDate}}>
        <div className={styles.selector}>
            <DatePickerControls></DatePickerControls>
            <DatePickerCalendar onDateClicked={handleDatePicked}></DatePickerCalendar>
            <Button color={"black"} onClick={handleSelect}>Применить</Button>
        </div>
    </DateSelectorContext.Provider>
}