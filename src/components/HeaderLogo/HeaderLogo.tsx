import styles from "../HeaderLogo/HeaderLogo.module.scss";

export function HeaderLogo() {
    return (
        <div className={styles.branding}>
            <svg width="3.3125rem" height="1.5rem" viewBox="0 0 53 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M26.4315 11.3425L49.9492 0.208008L52.967 3.22578L34.7563 23.1014L26.4315 14.8806L18.2107 23.1014L0 3.22578L3.01777 0.208008L26.4315 11.3425Z"
                    fill="#F51B1B"/>
            </svg>
            <p className={styles.company}>red collar</p>
            <h2 className={styles.name}>planner <span className={styles.red}>event</span></h2>
        </div>
    )
}