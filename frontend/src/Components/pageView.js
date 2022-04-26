import React from 'react'
import { Outlet } from 'react-router-dom'

export function PageView() {
    return (
        <div>
            <h1>PageView</h1>
            <Outlet></Outlet>
        </div>
    )
}
