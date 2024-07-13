import React, {createContext, FC, useState} from "react";
import {ModalError} from "../components/ModalError/ModalError.tsx";

export type ModalErrorContextType = {
    open: () => void
}

export const ModalErrorContext = createContext<ModalErrorContextType | null>(null)

const ModalErrorProvider: FC<{children: React.ReactNode}> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)

    return <ModalErrorContext.Provider value={{open: () => setIsOpen(true)}}>
        <ModalError open={isOpen} onClose={() => setIsOpen(false)}></ModalError>
        {children}
    </ModalErrorContext.Provider>
}

export default ModalErrorProvider;