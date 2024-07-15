import {Input} from "../Input/Input.tsx";
import {DatePicker} from "../DatePicker/DatePicker.tsx";
import {useState} from "react";

export function PeriodSelector(){
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")

    return <>
        <Input label={"Начало"} value={start} type={"text"} name={"Начало"} placeholder={""} error={false} errorMessage={""}></Input>
        <Input label={"Конец"} value={end} type={"text"} name={"Начало"} placeholder={""} error={false} errorMessage={""}></Input>
        <DatePicker onSelect={(start, end) => {setStart(start.toISOString()); setEnd(end.toISOString()); }} selectingStart></DatePicker>
    </>
}