import { isJSessionIdPresent } from "@/utils/jsession-token"
import { Outlet, Navigate, useLocation } from "react-router-dom"

export default function AuthRequired() {
    const isLoggedIn = isJSessionIdPresent()
    const location = useLocation() 

    console.log(isLoggedIn + "go to frontend")
    
    if (!isLoggedIn) {
        return (
            <Navigate 
                to="/login" 
                state={{
                    message: "You must log in first",
                    from: location.pathname
                }} 
                replace
            />)
    }
    return <Outlet />
}