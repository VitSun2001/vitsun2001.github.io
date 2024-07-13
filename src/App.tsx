import './App.scss'
import {Header} from "./components/Header/Header.tsx";
import {Calendar} from "./components/Calendar/Calendar.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";
import ModalErrorProvider from "./contexts/ModalErrorContext.tsx";
import CalendarContext from "./contexts/CalendarContext.tsx";
import useCalendar from "./hooks/useCalendar.tsx";

function App() {
    const calendar = useCalendar()

    return (
        <AuthProvider>
            <ModalErrorProvider>
                <CalendarContext.Provider value={calendar}>
                    <header id={"header"}>
                        <Header/>
                    </header>
                    <main id={"main"}>
                        <Calendar/>
                    </main>
                </CalendarContext.Provider>
            </ModalErrorProvider>
        </AuthProvider>
    )
}

export default App
