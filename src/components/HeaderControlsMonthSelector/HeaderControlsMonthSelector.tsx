import styles from "./HeaderControlsMonthSelector.module.scss";
import {useContext} from "react";
import {monthNames} from "../../constants/dateTime.ts";
import CalendarContext, {CalendarContextType} from "../../contexts/CalendarContext.tsx";
import {IconArrowLeft} from "../Icons/IconArrowLeft.tsx";
import {IconArrowRight} from "../Icons/IconArrowRight.tsx";

export function HeaderControlsMonthSelector() {
    const calendar = useContext(CalendarContext) as CalendarContextType

    return (
        <div className={styles.controls}>
            <h3 className={styles.month}>{monthNames[calendar.selectedMonth]} {new Date().getFullYear() != calendar.selectedYear ? calendar.selectedYear : ""}</h3>
            <button onClick={calendar.decrementMonth}>
                <IconArrowLeft size={"1.5rem"}></IconArrowLeft>
            </button>
            <button onClick={calendar.incrementMonth}>
                <IconArrowRight size={"1.5rem"}></IconArrowRight>
            </button>
        </div>
    )
}