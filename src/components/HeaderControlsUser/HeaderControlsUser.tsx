import styles from "./HeaderControlsUser.module.scss"
import {Button} from "../Button/Button.tsx";
import {useContext} from "react";
import {AuthContext, AuthContextType} from "../../contexts/AuthContext.tsx";
import {Avatar} from "../Avatar/Avatar.tsx";
import {IconPlus} from "../Icons/IconPlus.tsx";

export function HeaderControlsUser() {
    const authContext = useContext(AuthContext) as AuthContextType

    return <>
        {authContext.user ?
            <>
                <div className={styles.container}>
                    <Button color={"black"}>
                        <div style={{height: 0, display: "flex", justifyContent: "center", alignContent: "center"}}>
                            <IconPlus size={"1.375rem"}/>
                        </div>
                        &nbsp;
                    </Button>
                    <Avatar size={"5rem"} imageUrl={""}></Avatar>
                </div>
            </>
            :
            <>
                <Button color={"black"} onClick={authContext.openLogin}>Войти</Button>
            </>
        }
    </>
}