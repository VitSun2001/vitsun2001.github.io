import styles from './ModalLogin.module.scss'
import {Input} from "../Input/Input.tsx";
import {useContext, useState} from "react";
import {Button} from "../Button/Button.tsx";
import qs from "qs";
import axiosInstance from "../../api/axios.ts";
import {isAxiosError} from "axios";
import {Modal} from "../Modal/Modal.tsx";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.tsx";
import {IconCross} from "../Icons/IconCross.tsx";
import {IconEyeOpen} from "../Icons/IconEyeOpen.tsx";
import {IconEyeClosed} from "../Icons/IconEyeClosed.tsx";

interface ModalLoginProps {
    open: boolean,
    onClose: () => void,
    onSignUp: (email: string) => void
}

export function ModalLogin({open, onClose, onSignUp}: ModalLoginProps) {
    const authContext = useContext(AuthContext) as AuthContextType
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [userExists, setUserExists] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [serverError, setServerError] = useState(false)

    const handleEmailChange = (value: string) => {
        setEmail(value)
    }

    const handleNext = () => {
        const pattern = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/

        const emailError = !pattern.test(email)
        setEmailError(emailError)

        if (!pattern.test(email)) return

        const query = qs.stringify({
            filters: {
                email: {
                    $eq: email
                }
            }
        })

        const request = `api/users?${query}`

        setServerError(false);
        axiosInstance.get(request)
            .then((response) => {
                console.log(response)
                if (response.data.length > 0)
                    setUserExists(true)
                else {
                    onSignUp(email)
                }
            })
            .catch((error) => {
                if (isAxiosError(error)) {
                    if (error.code?.charAt(0) == "5") {
                        setServerError(true)
                    }
                }
            })
    }

    const handlePasswordChange = (value: string) => {
        setPasswordError(false)
        setPassword(value)
    }

    const handleSignIn = () => {
        authContext.login(email, password).then(() => {
            onClose()
        }).catch((error) => {
            if (isAxiosError(error)) {
                if (error.code?.charAt(0) == "5") {
                    setServerError(true)
                }
            } else {
                setPasswordError(true)
            }
        })
    }

    return (
        <Modal label={"Вход"} open={open} onClose={onClose}>
            <div className={styles.container}>
                {!userExists ? (<>
                    <Input
                        value={email}
                        type={"email"}
                        label={"E-mail"}
                        name={"E-mail"}
                        error={emailError || serverError}
                        placeholder={""}
                        onChange={handleEmailChange}
                        errorMessage={emailError ? "Некорректный e-mail" : "Что-то пошло не так, попробуйте позже"}
                        addon={<IconCross size={"0.75rem"}/>}
                        onAddonClick={() => handleEmailChange("")}
                        addonOnFocus
                    />
                    <Button label={"Далее"} color={"black"} onClick={handleNext}/>
                </>) : (<>
                        <Input
                            value={password}
                            type={passwordVisible ? "text" : "password"}
                            label={"Пароль"}
                            name={"Пароль"}
                            error={passwordError || serverError}
                            placeholder={""}
                            onChange={handlePasswordChange}
                            errorMessage={passwordError ? "Неверный пароль" : "Что-то пошло не так, попробуйте позже"}
                            addon={passwordVisible ? <IconEyeOpen size={"1.75rem"}/> : <IconEyeClosed size={"1.75rem"}/>}
                            onAddonClick={()=> setPasswordVisible(!passwordVisible)}
                        />
                        <Button label={"Войти"} color={"black"} onClick={handleSignIn}></Button>
                    </>
                )}
            </div>
        </Modal>
    )
}