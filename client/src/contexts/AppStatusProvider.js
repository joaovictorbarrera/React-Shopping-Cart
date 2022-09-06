import React, { createContext, useContext, useState } from 'react'

const AppStatusContext = createContext()
const SetAppStatusContext = createContext()

export function useAppStatus() {
    return useContext(AppStatusContext)
}

export function useSetAppStatus() {
    return useContext(SetAppStatusContext)
}

function AppStatusProvider({children}) {
    const [appStatus, setAppStatus] = useState("loading")

    return (
        <AppStatusContext.Provider value={appStatus}>
            <SetAppStatusContext.Provider value={setAppStatus}>
                {children}
            </SetAppStatusContext.Provider>
        </AppStatusContext.Provider>
    )
}

export default AppStatusProvider