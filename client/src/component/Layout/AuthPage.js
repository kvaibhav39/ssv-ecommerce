import React from 'react'
import { Outlet } from 'react-router'

const AuthPage = () => {
    return (
        <div className="Authpage">
            <Outlet />
        </div>
    )
}

export default AuthPage
