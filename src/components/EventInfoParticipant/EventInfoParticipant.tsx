import styles from './EventInfoParticipant.module.scss'
import {Avatar} from "../Avatar/Avatar.tsx";

interface EventInfoParticipant {
    username: string,
    avatar?: string,
    owner?: boolean
}

export function CalendarDayEventInfoParticipant({username, avatar, owner}: EventInfoParticipant) {
    return (
        <div className={styles.container}>
            <Avatar imageUrl={avatar ? avatar : ""} size={"2.5rem"}></Avatar>
            <div className={styles.usernameContainer}>
                <div className={styles.username}>{username}</div>
                {owner ? <div className={styles.ownerTag}>Организатор</div> : ""}
            </div>
        </div>
    );
}