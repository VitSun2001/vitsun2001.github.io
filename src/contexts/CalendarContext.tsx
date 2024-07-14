import {createContext} from "react";

export type CalendarContextType = {
    days: Date[]
    selectedMonth: number,
    selectedYear: number,
    incrementMonth: () => void,
    decrementMonth: () => void,
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export default CalendarContext
