import styles from "./Calendar.module.scss"
import {CalendarWeekday} from "../CalendarWeekday/CalendarWeekday.tsx";
import {CalendarDay} from "../CalendarDay/CalendarDay.tsx";
import {useContext, useEffect, useState} from "react";
import qs from "qs";
import axiosInstance from "../../api/axios.ts";
import {weekDayNames} from "../../constants/dateTime.ts";
import CalendarContext, {CalendarContextType} from "../../contexts/CalendarContext.tsx";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.tsx";
import {EventInfo} from "../EventInfo/EventInfo.tsx";
import {ModalErrorContext, ModalErrorContextType} from "../../contexts/ModalErrorContext.tsx";

export function Calendar() {
    const authContext = useContext(AuthContext) as AuthContextType
    const errorContext = useContext(ModalErrorContext) as ModalErrorContextType
    const calendar = useContext(CalendarContext) as CalendarContextType

    const [events, setEvents] = useState<Array<any>>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>(null)
    const [isEventInfoOpen, setIsEventInfoOpen] = useState(false)

    useEffect(() => {
        const loadEvents = (page: number, loadedEvents: Array<any> = []) => {
            const pastLimit = new Date(calendar.days[0])
            const futureLimit = new Date(calendar.days[calendar.days.length - 1])
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
                },
                populate: {
                    owner: {
                        fields: ["id"],
                        filters: {
                            id: {
                                $eq: authContext.user?.id ? authContext.user.id : "0"
                            }
                        }
                    },
                    participants: {
                        fields: ["id"],
                        filters: {
                            id: {
                                $eq: authContext.user?.id ? authContext.user.id : "0"
                            }
                        }
                    }
                },
                pagination: {
                    page: page,
                    pageSize: 100,
                },
            })

            const request = `/api/events?${query}`

            axiosInstance.get(request)
                .then((response) => {
                    loadedEvents.push(...response.data.data)
                    if (response.data.meta.pagination.page < response.data.meta.pagination.pageCount)
                        loadEvents(page + 1, loadedEvents)
                    else {
                        setEvents(loadedEvents)
                    }
                })
                .catch(() => errorContext.open())
        }

        if (calendar.days.length == 0) return
        loadEvents(1)
    }, [authContext.user, calendar, isEventInfoOpen])

    const weekDaysComponents = weekDayNames.map(day => <CalendarWeekday day={day}/>)
    const daysComponents = calendar.days.map(
        (day, index) => {
            return <CalendarDay
                day={day}
                events={
                    events.filter(event => {
                        const dayStart = new Date(day)
                        dayStart.setHours(0, 0, 0, 0)
                        const dayEnd = new Date(day)
                        dayEnd.setHours(23, 59, 59, 999)
                        return (Date.parse(event.dateStart) >= dayStart.getTime() && Date.parse(event.dateStart) <= dayEnd.getTime())
                            || Date.parse(event.dateStart) <= dayEnd.getTime() && Date.parse(event.dateEnd) >= dayStart.getTime()
                    })}
                weekend={index % 7 - 6 == 0 || index % 7 - 5 == 0}
                currentMonth={day.getMonth() == calendar.selectedMonth}
                onClick={(event) => {setSelectedEvent(event); setIsEventInfoOpen(true);}}
            />
        })

    return (
        <CalendarContext.Provider value={calendar}>
            <div className={styles.calendar}>
                {weekDaysComponents}
                {daysComponents}
            </div>
            <EventInfo eventId={selectedEvent?.id} open={isEventInfoOpen} onClose={() => {setIsEventInfoOpen(false)}}></EventInfo>
        </CalendarContext.Provider>
    )
}