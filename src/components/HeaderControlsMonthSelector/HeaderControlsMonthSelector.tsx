import styles from "./HeaderControlsMonthSelector.module.scss";
import {useContext} from "react";
import {DateContext, DateContextType} from "../../contexts/DateContext.tsx";

export function HeaderControlsMonthSelector() {
    const dateContext = useContext(DateContext) as DateContextType
    const monthMap = [
        {number: 0, name: "Январь"},
        {number: 1, name: "Февраль"},
        {number: 2, name: "Март"},
        {number: 3, name: "Апрель"},
        {number: 4, name: "Май"},
        {number: 5, name: "Июнь"},
        {number: 6, name: "Июль"},
        {number: 7, name: "Август"},
        {number: 8, name: "Сентябрь"},
        {number: 9, name: "Октябрь"},
        {number: 10, name: "Ноябрь"},
        {number: 11, name: "Декабрь"},
    ]

    return (
        <div className={styles.controls}>
            <h3 className={styles.month}>{monthMap.find(x => x.number == dateContext.selectedMonth)?.name} {dateContext.currentDate().getFullYear() != dateContext.selectedYear ? dateContext.selectedYear : ""}</h3>
            <button onClick={dateContext.decrementMonth}>
                <svg width="2rem" height="2rem" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 6L9.70711 15.2929C9.31658 15.6834 9.31658 16.3166 9.70711 16.7071L19 26"
                          stroke="#0D0C0C" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </button>
            <button onClick={dateContext.incrementMonth}>
                <svg width="2rem" height="2rem" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6L22.2929 15.2929C22.6834 15.6834 22.6834 16.3166 22.2929 16.7071L13 26"
                          stroke="#0D0C0C" stroke-width="4" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    )
}