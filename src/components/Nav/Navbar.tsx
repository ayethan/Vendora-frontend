import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Menu, X } from 'lucide-react';
import { logoutUser } from '../../store/userSlice.js';

import SearchBar from './SearchBar.js';
import UserMenu from './UserMenu.js';
import NavLinks from './NavLinks.js';
import LocationPicker from './LocationPicker.js';
import CartIcon from './CartIcon.js';

interface UserState {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
}

interface RootState {
    user: {
        user: UserState | null;
        cart: {
            items: any[];
        };
    };
}

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await dispatch(logoutUser() as any);
            navigate("/signin");
            toast.success("Logout successful!");
        } catch (error: any) {
            toast.error(error?.message || "Logout failed.");
            console.error("Logout error:", error);
        }
    };

    return (
        <header className="bg-white py-4 shadow-sm sticky top-0 z-50 w-full">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo and Location */}
                <div className="flex items-center">
                    <Link to="/">
                        <h1 className="font-bold text-3xl">
                            <span className="text-red-500 font-serif">V</span>endora
                        </h1>
                    </Link>
                    <div className="hidden md:flex ml-8">
                        <LocationPicker />
                    </div>
                </div>

                {/* Desktop Search */}
                <div className="hidden md:flex w-2/5">
                    <SearchBar />
                </div>

                {/* Desktop Nav Icons & Mobile Menu Button */}
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex">
                        <NavLinks className="flex gap-7 items-center text-xl font-semibold" />
                    </nav>
                    <div className="flex items-center gap-4">
                        <CartIcon />
                        <UserMenu user={user} handleLogout={handleLogout} />
                    </div>
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-md">
                    <div className="px-4 pt-2 pb-4 space-y-2 sm:px-6">
                        <div className="mb-4">
                            <SearchBar />
                        </div>
                        <NavLinks linkClassName="block px-3 py-2 rounded-md text-base font-medium" />
                        <div className="border-t border-gray-200 pt-4">
                           <LocationPicker />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
