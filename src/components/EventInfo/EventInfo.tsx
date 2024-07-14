import styles from './EventInfo.module.scss'
import {useContext, useEffect, useState} from "react";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.tsx";
import {Modal} from "../Modal/Modal.tsx";
import qs from "qs";
import axiosInstance from "../../api/axios.ts";
import {CalendarDayEventInfoParticipant} from "../EventInfoParticipant/EventInfoParticipant.tsx";
import 'react-alice-carousel/lib/alice-carousel.css';
import {EventInfoGallery} from "../EventInfoGallery/EventInfoGallery.tsx";
import {Button} from "../Button/Button.tsx";
import {Hint} from "../Hint/Hint.tsx";
import {EventJoinSuccess} from "../EventJoinSuccess/EventJoinSuccess.tsx";
import {ModalConfirm} from "../ModalConfirm/ModalConfirm.tsx";
import {ModalErrorContext, ModalErrorContextType} from "../../contexts/ModalErrorContext.tsx";

interface EventInfoProps {
    eventId: number,
    open: boolean,
    onClose: () => void,
}

export function EventInfo({eventId, open, onClose}: EventInfoProps) {
    const authContext = useContext(AuthContext) as AuthContextType
    const errorContext = useContext(ModalErrorContext) as ModalErrorContextType
    const [event, setEvent] = useState<any>(null)
    const [pastEvent, setPastEvent] = useState(false)
    //const [isOwner, setIsOwner] = useState(false)
    const [isParticipant, setIsParticipant] = useState(false)
    const [isJoinSuccessOpen, setIsJoinSuccessOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

    useEffect(() => {

        const loadEvent = () => {
            const query = qs.stringify({
                populate: {
                    owner: {
                        fields: ["id", "username"],
                    },
                    participants: {
                        fields: ["id", "username"]
                    },
                    photos: {
                        fields: ['name', 'url']
                    },
                },
            })

            const request = `/api/events/${eventId}?${query}`

            axiosInstance.get(request)
                .then((response) => {
                    setEvent(response.data.data)
                    setPastEvent((Date.parse(response.data.data.dateStart) < new Date().getTime() && !response.data.data.dateEnd) || (response.data.data.dateEnd && Date.parse(response.data.data.dateEnd) < new Date().getTime()))
                })
                .catch(() =>{
                    handleClose()
                    errorContext.open()
                })
        }

        // const loadOwner = () => {
        //     const query = qs.stringify({
        //         fields: ["id"],
        //         populate: {
        //             owner: {
        //                 fields: ["id"],
        //                 filters: {
        //                     id: {
        //                         $eq: authContext.user?.id
        //                     }
        //                 }
        //             }
        //         },
        //     })
        //
        //     const request = `api/events/${eventId}?${query}`
        //
        //     axiosInstance.get(request)
        //         .then((response) => {
        //             if (response.data.data.owner)
        //                 setIsOwner(true)
        //             else
        //                 setIsOwner(false)
        //         })
        //         .catch((error) => setError(error))
        // }

        const loadParticipant = () => {
            const query = qs.stringify({
                fields: ["id"],
                populate: {
                    participants: {
                        fields: ["id"],
                        filters: {
                            id: {
                                $eq: authContext.user?.id
                            }
                        }
                    }
                },
            })

            const request = `/api/events/${eventId}?${query}`

            axiosInstance.get(request)
                .then((response) => {
                    if (response.data.data.participants.length > 0)
                        setIsParticipant(true)
                    else
                        setIsParticipant(false)
                })
                .catch(() => {
                    handleClose()
                    errorContext.open
                })
        }

        if (open) {
            loadEvent()
            if (authContext.user) {
                //loadOwner()
                loadParticipant()
            }
        }
    }, [open])

    const handleClose = () => {
        onClose()
    }

    const handleOpenLogin = () => {
        handleClose()
        authContext.openLogin()
    }

    const handleJoin = () => {
        axiosInstance.post(`/api/events/${eventId}/join`)
            .then(() => {
                handleClose()
                setIsJoinSuccessOpen(true)
            })
            .catch(() => {
                handleClose()
                errorContext.open
            })
    }

    const handleLeave = () => {
        setIsConfirmModalOpen(true)
    }

    const handleConfirm = () => {
        axiosInstance.post(`/api/events/${eventId}/leave`)
            .then(() => {
                setIsConfirmModalOpen(false)
                handleClose()
            })
            .catch(() => {
                handleClose()
                errorContext.open
            })
    }

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return <>
        <Modal label={event?.title} open={open} onClose={handleClose}>
            {event ?
                <div className={styles.container}>
                    {pastEvent ?
                        <div className={styles.hint}>
                            <Hint>Мероприятие уже прошло</Hint>
                        </div>
                        :
                        ""
                    }
                    <div className={styles.about}>
                        <div className={`${styles.details} ${pastEvent ? styles.past : ""}`}>
                            <div className={styles.date}>
                                <h4>
                                    {new Intl.DateTimeFormat("ru", {
                                        weekday: "long"
                                    }).format(new Date(event.dateStart))}
                                </h4>
                                <h4>
                                    {new Intl.DateTimeFormat("ru", {
                                        day: "numeric",
                                        month: "long"
                                    }).format(new Date(event.dateStart))}
                                </h4>
                                <h4>
                                    {new Intl.DateTimeFormat("ru", {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    }).format(new Date(event.dateStart))}
                                </h4>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.location}>
                                {event.location}
                            </div>
                        </div>
                        <p className={styles.description}>
                            {event.description}
                        </p>
                    </div>
                    <div className={styles.participants}>
                        <h4>Участники</h4>
                        <div className={styles.list}>
                            {(event.owner) ?
                                <CalendarDayEventInfoParticipant username={event.owner.username} owner/>
                                :
                                ""
                            }
                            {event.participants.filter(x => x.id != event.owner?.id).map(x =>
                                <CalendarDayEventInfoParticipant username={x.username}/>)}
                        </div>
                    </div>
                    {event.photos?.length > 0 ?
                        <div className={styles.gallery}>
                            <EventInfoGallery
                                photos={event.photos?.map(x =>
                                    <img className={styles.image}
                                         src={import.meta.env.VITE_API_BASE_URL + x.url}
                                         alt={x.name}
                                    />)}
                            >
                            </EventInfoGallery>
                        </div>
                        :
                        ""
                    }
                    {!pastEvent ?
                        <div className={styles.footer}>
                            {
                                authContext.user ?
                                    <>
                                        {
                                            !isParticipant ?
                                                <>
                                                    <Button color={"black"} onClick={handleJoin}>Присоединиться к
                                                        событию</Button>
                                                </>
                                                :
                                                <h4 className={styles.suggestion}>
                                                    Вы присоединились к событию. Если передумали, можете
                                                    <span className={styles.accent} onClick={handleLeave}> отменить участие.</span>
                                                </h4>
                                        }
                                    </>
                                    :
                                    <h4 className={styles.suggestion}>
                                        <span className={styles.accent} onClick={handleOpenLogin}>Войдите</span>,
                                        чтобы присоединиться к событию
                                    </h4>
                            }
                        </div>
                        :
                        ""
                    }
                </div>
                :
                ""
            }
        </Modal>
        {
            event ? <EventJoinSuccess open={isJoinSuccessOpen} event={event}
                                      onClose={() => setIsJoinSuccessOpen(false)}></EventJoinSuccess> : ""
        }
        <ModalConfirm
            open={isConfirmModalOpen}
            label={"Вы действительно хотите отменить участие?"}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleConfirm}
        >
        </ModalConfirm>
    </>
}