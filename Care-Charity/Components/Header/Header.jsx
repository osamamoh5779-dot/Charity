import { useEffect, useState } from 'react';
import './Header.css'
import { CiDark, CiLight } from "react-icons/ci";

import { themepage } from '../../Data/Data';

export default function Header() {

    const [theme, setTheme] = useState(themepage);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme])

    return (
        <div className="header">
            <div className="header-content">
                {theme === "dark" ? <CiLight style={{color: "white"}} onClick={() => setTheme(theme === "light" ? "dark" : "light")} /> : <CiDark onClick={() => setTheme(theme === "light" ? "dark" : "light")} />
                }
            </div>
        </div>
    )
}