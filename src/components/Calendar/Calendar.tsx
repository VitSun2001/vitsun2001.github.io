import styles from "./Calendar.module.scss"
import {CalendarWeekday} from "../CalendarWeekday/CalendarWeekday.tsx";
import {CalendarDay} from "../CalendarDay/CalendarDay.tsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import qs from "qs";
import {DateContext, DateContextType} from "../../contexts/DateContext.tsx";

export function Calendar() {
    const weekDays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
    const dateContext = useContext(DateContext) as DateContextType

    const [days, setDays] = useState<Array<Date>>([]);
    const [error, setError] = useState(null);
    const [events, setEvents] = useState<Array<any>>([]);

    useEffect(() => {
        const dates: Array<Date> = []
        const firstDay = new Date(dateContext.selectedYear, dateContext.selectedMonth)
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
    }, [dateContext.selectedMonth, dateContext.selectedYear])

    useEffect(() => {
        if (days.length == 0) return
        const pastLimit = days[0]
        const futureLimit = days[days.length - 1]
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

        console.log(pastLimit)
        console.log(futureLimit)
        const request = `https://planner.rdclr.ru/api/events?${query}`
        console.log(request)

        axios.get(request)
            .then((response) => {
                console.log(response.data.data)
                setEvents(response.data.data)
            })
            .catch((error) => setError(error))
    }, [days])

    const weekDaysComponents = weekDays.map(day => <CalendarWeekday day={day}/>)
    const daysComponents = days.map(
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
                currentMonth={day.getMonth() == dateContext.selectedMonth}
            />
        })

    return (
        <div className={styles.calendar}>
            {weekDaysComponents}
            {daysComponents}
        </div>
    )
}