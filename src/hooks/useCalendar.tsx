import {useEffect, useState} from "react";

export default function useCalendar(){
    const [days, setDays] = useState<Array<Date>>([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())

    useEffect(() => {
        const dates: Array<Date> = []
        const firstDay = new Date(selectedYear, selectedMonth)
        for (let i = (firstDay.getDay() + 6) % 7; i > 0; i--) {
            const dateToPrepend = new Date(firstDay)
            dateToPrepend.setDate(dateToPrepend.getDate() - i)
            dates.push(dateToPrepend)
        }
        const amountOfDatesToAdd = 42 - dates.length
        for (let i = 0; i < amountOfDatesToAdd; i++) {
            const dateToAdd = new Date(firstDay)
            dateToAdd.setDate(dateToAdd.getDate() + i)
            dates.push(dateToAdd)
        }
        setDays(dates)
    }, [selectedYear, selectedMonth])

    const incrementMonth = () => {
        if(selectedMonth == 11){
            setSelectedMonth(0)
            setSelectedYear(selectedYear+1)
        }else {
            setSelectedMonth(selectedMonth+1)
        }
    }

    const decrementMonth = () => {
        if(selectedMonth == 0){
            setSelectedMonth(11)
            setSelectedYear(selectedYear-1)
        }else {
            setSelectedMonth(selectedMonth-1)
        }
    }

    return {days, selectedYear, selectedMonth, incrementMonth, decrementMonth}
}