import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

const LocationPicker = () => {
    const hasLocation = false; // This can be replaced with actual logic

    return (
        <div className="flex gap-1 cursor-pointer text-gray-700 items-center">
            <MapPin className="text-red-500" />
            <span className="font-semibold">{hasLocation ? 'Location' : 'Add address'}</span>
            <ChevronDown className="ml-1" size={14} />
        </div>
    );
};

export default LocationPicker;
