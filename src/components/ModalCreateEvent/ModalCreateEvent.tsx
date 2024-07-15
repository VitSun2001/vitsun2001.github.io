// import styles from "./ModalCreateEvent.module.scss"
// import {Modal} from "../Modal/Modal.tsx";
// import {Input} from "../Input/Input.tsx";
//
// interface ModalCreateEventProps {
//     open: boolean,
//     onClose: () => void,
//     onCreate: () => void
// }
//
// export function ModalCreateEvent({open, onClose, onCreate}: ModalCreateEventProps) {
//     return (
//         <Modal label={"Создание события"} open={open} onClose={onClose}>
//             <div className={styles.container}>
//                 <div className={styles.div1}><Input label={"Название"} required/></div>
//                 <div className={styles.div2}><Input label={"Описание"} type={"textarea"} textAriaHeight={"100%"} required/></div>
//                 <div className={styles.div3}><Input label={"Участники"}/></div>
//                 <div className={styles.div4}><Input label={"Изображение"}/></div>
//                 <div className={styles.div5}><Input label={"Начало"} required/></div>
//                 <div className={styles.div6}><Input label={"Конец"}/></div>
//                 <div className={styles.div7}><Input label={"Время"} required/></div>
//                 <div className={styles.div8}><Input label={"Место проведения"} required/></div>
//                 <div className={styles.div9}><Input label={"Организатор"}/></div>
//             </div>
//         </Modal>
//     );
// }