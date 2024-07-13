import styles from "./Avatar.module.scss";

interface AvatarProps{
    imageUrl: string
    size: string
    placeholder?: boolean
}
export function Avatar({imageUrl, size, placeholder}: AvatarProps) {
    return (
        <div style={{width: size, height: size}} className={`${styles.avatar} ${placeholder ? styles.placeholder : ""}`}>
            <img src={imageUrl} alt={""} onError={(e) => e.currentTarget.className = styles.hidden} className={styles.img} />
        </div>
    );
}