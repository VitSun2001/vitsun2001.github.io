import React, {createContext, FC, useState} from "react";

export type DateContextType = {
    currentDate: () => Date,
    selectedMonth: number
    // selectedMonthFullname: string,
    // selectedMonthShortname: string,
    selectedYear: number
    incrementMonth: () => void,
    decrementMonth: () => void
}

export const DateContext = createContext<DateContextType | null>(null)

const DateProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const currentDate = () => new Date()
    const [selectedMonth, setSelectedMonth] = useState(currentDate().getMonth())
    // const [selectedMonthFullname, setSelectedMonthFullname] = useState("")
    // const [selectedMonthShortname, setSelectedMonthShortname] = useState("")
    const [selectedYear, setSelectedYear] = useState(currentDate().getFullYear())
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
    return(
        <DateContext.Provider value = {{currentDate, selectedMonth, selectedYear, incrementMonth, decrementMonth}}>
            {children}
        </DateContext.Provider>
    )
}

export default DateProvider;