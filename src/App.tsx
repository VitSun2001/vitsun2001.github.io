import './App.scss'
import {Header} from "./components/Header/Header.tsx";
import DateProvider from "./contexts/DateContext.tsx";
import {Calendar} from "./components/Calendar/Calendar.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";
import ModalErrorProvider from "./contexts/ModalErrorContext.tsx";

function App() {

    return (
        <AuthProvider>
            <ModalErrorProvider>
                <DateProvider>
                    <header id={"header"}>
                        <Header/>
                    </header>
                    <main id={"main"}>
                        <Calendar/>
                    </main>
                </DateProvider>
            </ModalErrorProvider>
        </AuthProvider>
    )
}

export default App
