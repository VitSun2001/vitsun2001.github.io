import {CalendarContextType} from "./CalendarContext.tsx";
import {createContext} from "react";

export type DateSelectorContextType = CalendarContextType & {
    beginDate?: Date,
    endDate?: Date
}

const DateSelectorContext = createContext<DateSelectorContextType | null>(null)

export default DateSelectorContext