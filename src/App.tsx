import './App.scss'
import {Header} from "./components/Header/Header.tsx";
import DateProvider from "./contexts/DateContext.tsx";
import {Calendar} from "./components/Calendar/Calendar.tsx";

function App() {

    return (
        <DateProvider>
            <header id={"header"}>
                <Header/>
            </header>
            <Calendar/>
        </DateProvider>
    )
}

export default App
