import {useContext, useState} from "react";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.tsx";
import {Modal} from "../Modal/Modal.tsx";
import styles from "../ModalRegister/ModalRegister.module.scss";
import {Input} from "../Input/Input.tsx";
import {Button} from "../Button/Button.tsx";
import axiosInstance from "../../api/axios.ts";
import {isAxiosError} from "axios";
import {IconEyeOpen} from "../Icons/IconEyeOpen.tsx";
import {IconEyeClosed} from "../Icons/IconEyeClosed.tsx";
import {ModalRegisterHint} from "../ModalRegisterHint/ModalRegisterHint.tsx";
import {ModalErrorContext, ModalErrorContextType} from "../../contexts/ModalErrorContext.tsx";

export interface ModalRegisterProps {
    open: boolean,
    email: string,
    onClose: () => void,
}

export function ModalRegister({open, email, onClose}: ModalRegisterProps) {
    const authContext = useContext(AuthContext) as AuthContextType
    const modalErrorContext = useContext(ModalErrorContext) as ModalErrorContextType

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(false)
    const [repeatPassword, setRepeatPassword] = useState('')
    const [repeatPasswordError, setRepeatPasswordError] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)

    const handleNameChange = (value: string) => {
        setName(value)
    }

    const handlePasswordChange = (value: string) => {
        setPassword(value)
    }

    const handleRepeatPasswordChange = (value: string) => {
        setRepeatPassword(value)
    }

    const handleSignIn = () => {
        const nameError = !name
        setNameError(nameError)

        const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
        const passwordError = !passwordRegexp.test(password)
        setPasswordError(passwordError)

        const repeatPasswordError = password != repeatPassword
        setRepeatPasswordError(repeatPasswordError)

        if (nameError || passwordError || repeatPasswordError) return

        axiosInstance.post("api/auth/local/register", {
            username: name,
            email: email,
            password: password
        }).then(() => {
            authContext.login(email, password).then(() => {
                handleClose()
            }).catch(error => {
                if (isAxiosError(error)) {
                    handleClose()
                    modalErrorContext.open()
                }
            })
        }).catch(error => {
            if (isAxiosError(error)) {
                handleClose()
                modalErrorContext.open()
            }
        })
    }

    const handleClose = () => {
        setName("")
        setNameError(false)
        setPassword("")
        setPasswordError(false)
        setRepeatPassword("")
        setRepeatPasswordError(false)
        setPasswordVisible(false)
        onClose()
    }

    return (
        <Modal label={"Регистрация"} open={open} onClose={handleClose}>
            <div className={styles.container}>
                <ModalRegisterHint></ModalRegisterHint>
                <div className={styles.form}>
                    <Input
                        value={name}
                        type={"text"}
                        label={"Ваше имя"}
                        name={"name"}
                        error={nameError}
                        placeholder={""}
                        onChange={handleNameChange}
                        errorMessage={nameError ? "Обязательное поле" : "Что-то пошло не так, попробуйте позже"}
                    />
                    <Input
                        value={password}
                        type={passwordVisible ? "text" : "password"}
                        label={"Пароль"}
                        name={"password"}
                        error={passwordError}
                        placeholder={""}
                        onChange={handlePasswordChange}
                        errorMessage={passwordError ? "Используйте латинские буквы, цифры и спец символы" : "Что-то пошло не так, попробуйте позже"}
                        addon={passwordVisible ? <IconEyeOpen size={"1.75rem"}/> : <IconEyeClosed size={"1.75rem"}/>}
                        onAddonClick={()=> setPasswordVisible(!passwordVisible)}
                    />
                    <Input
                        value={repeatPassword}
                        type={passwordVisible ? "text" : "password"}
                        label={"Повторить пароль"}
                        name={"passwordRepeat"}
                        error={repeatPasswordError}
                        placeholder={""}
                        onChange={handleRepeatPasswordChange}
                        errorMessage={repeatPasswordError ? "Пароли не совпадают" : "Что-то пошло не так, попробуйте позже"}
                        addon={passwordVisible ? <IconEyeOpen size={"1.75rem"}/> : <IconEyeClosed size={"1.75rem"}/>}
                        onAddonClick={()=> setPasswordVisible(!passwordVisible)}
                    />
                    <Button color={"black"} onClick={handleSignIn}>Зарегистрироваться</Button>
                </div>
            </div>
        </Modal>
    )
}