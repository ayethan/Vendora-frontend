import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

interface LocationPickerProps {
    hasLocation?: boolean; // Optional prop to make it more flexible
}

const LocationPicker: React.FC<LocationPickerProps> = ({ hasLocation = false }) => {
    return (
        <div className="flex gap-1 cursor-pointer text-gray-700 items-center">
            <MapPin className="text-red-500" />
            <span className="font-semibold">{hasLocation ? 'Location' : 'Add address'}</span>
            <ChevronDown className="ml-1" size={14} />
        </div>
    );
};

export default LocationPicker;
