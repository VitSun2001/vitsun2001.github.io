import {createContext, FC, ReactNode, useState} from "react";
import axiosInstance from "../api/axios.ts";
import {ModalLogin} from "../components/ModalLogin/ModalLogin.tsx";
import {ModalRegister} from "../components/ModalRegister/ModalRegister.tsx";

export type User = {
    id: number,
    username: string,
    email: string,
    provider: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updatedAt: string
}

export type AuthContextType = {
    user?: User,
    token: string,
    login: (email: string, password: string) => Promise<boolean>
    openLogin: () => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User>()
    const [token, setToken] = useState(localStorage.getItem("jwt") || "")

    const [loginOpen, setLoginOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [registerOpen, setRegisterOpen] = useState(false)
    const handleLoginClose = () => {
        setLoginOpen(false)
    }

    const handleOnOpenSignUp = (email: string) => {
        setEmail(email)
        setRegisterOpen(true)
    }

    const handleRegisterClose = () => {
        setEmail("")
        setRegisterOpen(false)
    }

    const login = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post("api/auth/local", {
                identifier: email,
                password: password
            })
            setUser(response.data.user)
            setToken(response.data.token)
            localStorage.setItem("jwt", token);
            return true
        } catch (e) {
            return false
        }
    }

    const openLogin = () => setLoginOpen(true)

    const logout = () => {
        setUser(undefined)
        setToken("")
        localStorage.setItem("jwt", token)
    }

    return <AuthContext.Provider value={{token, user, login, openLogin, logout}}>
        <ModalLogin open={loginOpen} onClose={handleLoginClose} onSignUp={handleOnOpenSignUp}></ModalLogin>
        <ModalRegister open={registerOpen} email={email} onClose={handleRegisterClose}></ModalRegister>
        {children}
    </AuthContext.Provider>;
};

export default AuthProvider;