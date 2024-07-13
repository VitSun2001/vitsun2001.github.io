import styles from "./Calendar.module.scss"
import {CalendarWeekday} from "../CalendarWeekday/CalendarWeekday.tsx";
import {CalendarDay} from "../CalendarDay/CalendarDay.tsx";
import {useContext, useEffect, useState} from "react";
import qs from "qs";
import axiosInstance from "../../api/axios.ts";
import {weekDayNames} from "../../constants/dateTime.ts";
import CalendarContext, {CalendarContextType} from "../../contexts/CalendarContext.tsx";

export function Calendar() {
    const calendar = useContext(CalendarContext) as CalendarContextType

    const [error, setError] = useState(null);
    const [events, setEvents] = useState<Array<any>>([]);


    useEffect(() => {
        if (calendar.days.length == 0) return
        const pastLimit = calendar.days[0]
        const futureLimit = calendar.days[calendar.days.length - 1]
        futureLimit.setDate(futureLimit.getDate() + 1)

        const query = qs.stringify({
            filters: {
                $or: [
                    {
                        $and: [
                            {
                                dateEnd: {
                                    $gte: pastLimit
                                }
                            },
                            {
                                dateEnd: {
                                    $lt: futureLimit
                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            {
                                dateStart: {
                                    $gte: pastLimit
                                }
                            },
                            {
                                dateStart: {
                                    $lt: futureLimit
                                }
                            }
                        ]
                    }
                ]
            }
        })

        const request = `api/events?${query}`

        axiosInstance.get(request)
            .then((response) => {
                console.log(response.data.data)
                setEvents(response.data.data)
            })
            .catch((error) => setError(error))
    }, [calendar])

    const weekDaysComponents = weekDayNames.map(day => <CalendarWeekday day={day}/>)
    const daysComponents = calendar.days.map(
        (day, index) => {
            return <CalendarDay
                day={day}
                events={
                    events.filter(x => {
                        const start = new Date(day)
                        start.setHours(0, 0, 0, 0)
                        const end = new Date(day)
                        end.setHours(23, 59, 59, 999)
                        return Date.parse(x.dateStart) <= end.getTime() && Date.parse(x.dateEnd) >= start.getTime()
                    })}
                weekend={index % 7 - 6 == 0 || index % 7 - 5 == 0}
                currentMonth={day.getMonth() == calendar.selectedMonth}
            />
        })

    return (
        <CalendarContext.Provider value={calendar}>
            <div className={styles.calendar}>
                {weekDaysComponents}
                {daysComponents}
            </div>
        </CalendarContext.Provider>
    )
}