import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';

const CartIcon = () => {
    const user = useSelector((state: any) => state.user.user);
    const cart = useSelector((state: any) => state.user.cart);

    const cartItemCount = cart?.items?.reduce((acc: any, item: any) => acc + item.quantity, 0) || 0;

    return (
        <Link to="/cart" className="relative flex items-center gap-2 text-gray-700 hover:text-black">
            <ShoppingCart size={24} />
            {user && cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                </span>
            )}
            <span className="sr-only">Cart</span>
        </Link>
    );
};

export default CartIcon;
