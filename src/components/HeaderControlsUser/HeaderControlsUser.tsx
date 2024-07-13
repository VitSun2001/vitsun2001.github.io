import styles from "./HeaderControlsUser.module.scss"
import {Button} from "../Button/Button.tsx";
import {ModalLogin} from "../ModalLogin/ModalLogin.tsx";
import {ModalRegister} from "../ModalRegister/ModalRegister.tsx";
import {useContext, useState} from "react";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.tsx";
import {Avatar} from "../Avatar/Avatar.tsx";
import {IconPlus} from "../Icons/IconPlus.tsx";

export function HeaderControlsUser() {
    const authContext = useContext(AuthContext) as AuthContextType
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

    return <>
        {authContext.user ?
            <>
                <div className={styles.container}>
                    <Button color={"black"}>
                        <div style={{height: 0, display: "flex", justifyContent: "center", alignContent: "center"}}>
                            <IconPlus size={"1.375rem"}/>
                        ext</div>
                        &nbsp;
                    </Button>
                    <Avatar size={"5rem"} imageUrl={""}></Avatar>
                </div>
            </>
            :
            <>
                <Button color={"black"} onClick={() => setLoginOpen(true)}>Войти</Button>
                <ModalLogin open={loginOpen} onClose={handleLoginClose} onSignUp={handleOnOpenSignUp}></ModalLogin>
                <ModalRegister open={registerOpen} email={email} onClose={handleRegisterClose}></ModalRegister>
            </>
        }
    </>
}