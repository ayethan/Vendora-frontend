import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import Store from '../../store/store.js'


type RootState = ReturnType<typeof Store.getState>;

const LocationPicker: React.FC = () => {
    const address = useSelector((state: RootState) => state.location.address);
    const displayAddress = address
        ? (address.length > 25 ? `${address.substring(0, 25)}...` : address)
        : 'Add address';

    return (
        <div className="flex gap-1 cursor-pointer text-gray-700 items-center">
            <MapPin className="text-red-500" />
            <span className="font-semibold">{displayAddress}</span>
            {/* <ChevronDown className="ml-1" size={14} /> */}
        </div>
    );
};

export default LocationPicker;
