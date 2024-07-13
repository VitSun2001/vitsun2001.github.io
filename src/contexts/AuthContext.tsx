import {createContext, FC, ReactNode, useState} from "react";
import axiosInstance from "../api/axios.ts";

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
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: FC<{children: ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User>()
    const [token, setToken] = useState(localStorage.getItem("jwt") || "")
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
    const logout = () => {
        setUser(undefined)
        setToken("")
        localStorage.setItem("jwt", token)
    }

    return <AuthContext.Provider value={{token, user, login, logout}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;