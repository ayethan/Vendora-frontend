import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User } from 'lucide-react';
import useClickOutside from './hooks/useClickOutside'; // .ts extension is implicit

// Assuming UserState is defined in Navbar.tsx or a common types file
interface UserState {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}

interface UserMenuProps {
    user: UserState | null;
    handleLogout: () => Promise<void>;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, handleLogout }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, () => {
        setIsOpen(false);
    });

    if (!user) {
        return (
            <Link to="/signin" className="flex items-center gap-2 text-gray-700 hover:text-black">
                <User size={24} />
                <span className="font-semibold">Login</span>
            </Link>
        );
    }

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen((prev) => !prev)} className="flex items-center p-1 rounded hover:bg-gray-100">
                <User size={24} />
                <ChevronDown className="ml-1" size={20} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-lg z-50">
                    {user.role === 'Admin' && (
                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Admin Panel
                        </Link>
                    )}
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Account
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
