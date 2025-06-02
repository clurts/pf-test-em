import { NavLink } from "react-router";
import { useState } from "react";
// import "./_Navigation.scss"

export default function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="nav__menu">
            <div 
                className="nav__burger" 
                onClick={toggleMenu}
                style={{
                    justifyContent: isMenuOpen ? "center" : "space-between"
                }}
            >
                <span></span>
                <span style={{ display: isMenuOpen ? "none" : "block" }}></span>
                <span style={{ display: isMenuOpen ? "none" : "block" }}></span>
                <span></span>
            </div>
            <ul 
                className="nav__links"
                style={{
                    display: isMenuOpen ? "flex" : "none"
                }}
            >
                <li className="nav__link">
                    <NavLink to="/about">About</NavLink>
                </li>
                <li className="nav__link">
                    <NavLink to="/projects">Projects</NavLink>
                </li>
                <li className="nav__link">
                    <NavLink to="/contact">Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
}