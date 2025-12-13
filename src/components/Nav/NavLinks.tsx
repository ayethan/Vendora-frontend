import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavLinksProps {
    className?: string;
    linkClassName?: string;
}

const NavLinks: React.FC<NavLinksProps> = ({ className, linkClassName }) => {
    const activeClass = 'text-red-500 ';
    const inactiveClass = 'text-gray-800 hover:text-red-500 transition-colors';

    return (
        <ul className={className}>
            <li>
                <NavLink to="/product" className={({ isActive }) => `${linkClassName} ${isActive ? activeClass : inactiveClass}`}>
                    Newsroom
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" className={({ isActive }) => `${linkClassName} ${isActive ? activeClass : inactiveClass}`}>
                    About
                </NavLink>
            </li>
            <li>
                <NavLink to="/contact" className={({ isActive }) => `${linkClassName} ${isActive ? activeClass : inactiveClass}`}>
                    Contact
                </NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;
