import styles from "./EventInfoGallery.module.scss"
import AliceCarousel from "react-alice-carousel";
import {IconArrowLeft} from "../Icons/IconArrowLeft.tsx";
import {IconArrowRight} from "../Icons/IconArrowRight.tsx";
import {useRef} from "react";


interface CalendarDayEventInfoGalleryProps {
    photos: HTMLElement[]
}

export function EventInfoGallery({photos}: CalendarDayEventInfoGalleryProps) {
    const carousel = useRef<AliceCarousel>(null);

    // @ts-ignore
    const renderDotsItem = ({isActive}) => {
        return <div className={`${styles.dot} ${isActive ? styles.active : ""}`}/>
    };

    return (
        <>
            <div className={styles.header}>
                <h3 className={styles.label}>Галерея</h3>
                <div className={styles.controls}>
                    <button onClick={(e) => carousel?.current?.slidePrev(e)}>
                        <IconArrowLeft size={"1.5rem"}></IconArrowLeft>
                    </button>
                    <button onClick={(e) => carousel?.current?.slideNext(e)}>
                        <IconArrowRight size={"1.5rem"}></IconArrowRight>
                    </button>
                </div>
            </div>
            <AliceCarousel
                mouseTracking
                disableButtonsControls
                renderDotsItem={renderDotsItem}
                responsive={{0: {items: 3.5, itemsFit: 'contain'}}}
                items={photos}
                ref={carousel}
                controlsStrategy="alternate"
            />
        </>
    );
}