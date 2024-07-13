import './App.scss'
import {Header} from "./components/Header/Header.tsx";
import DateProvider from "./contexts/DateContext.tsx";
import {Calendar} from "./components/Calendar/Calendar.tsx";
import AuthProvider from "./contexts/AuthContext.tsx";

function App() {

    return (
        <AuthProvider>
            <DateProvider>
                <header id={"header"}>
                    <Header/>
                </header>
                <Calendar/>
            </DateProvider>
        </AuthProvider>
    )
}

export default App
