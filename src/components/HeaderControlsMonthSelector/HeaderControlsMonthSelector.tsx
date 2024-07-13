import styles from "./HeaderControlsMonthSelector.module.scss";
import {useContext} from "react";
import {monthNames} from "../../constants/dateTime.ts";
import CalendarContext, {CalendarContextType} from "../../contexts/CalendarContext.tsx";

export function HeaderControlsMonthSelector() {
    const calendar = useContext(CalendarContext) as CalendarContextType

    return (
        <div className={styles.controls}>
            <h3 className={styles.month}>{monthNames[calendar.selectedMonth]} {new Date().getFullYear() != calendar.selectedYear ? calendar.selectedYear : ""}</h3>
            <button onClick={calendar.decrementMonth}>
                <svg width="2rem" height="2rem" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6L9.70711 15.2929C9.31658 15.6834 9.31658 16.3166 9.70711 16.7071L19 26"
                          stroke="#0D0C0C" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </button>
            <button onClick={calendar.incrementMonth}>
                <svg width="2rem" height="2rem" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6L22.2929 15.2929C22.6834 15.6834 22.6834 16.3166 22.2929 16.7071L13 26"
                          stroke="#0D0C0C" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    )
}