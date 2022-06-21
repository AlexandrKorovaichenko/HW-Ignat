import React from 'react'
import { NavLink } from 'react-router-dom'
import style from "../../p1-main/m1-ui/u1-app/App.module.css"

function Header() {
    return (
        <div className = {style.topMenu}>
            <div><NavLink to = "/big-jun">bigJun</NavLink></div>
            <div><NavLink to = "/simple-jun">simpleJun</NavLink></div>
            <div><NavLink to = "/little-jun">littleJun</NavLink></div>
            <div>Menu</div>
        </div>
    )
}

export default Header
