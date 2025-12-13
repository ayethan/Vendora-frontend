import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search } from 'lucide-react';
import useDebounce from './hooks/useDebounce';
import useClickOutside from './hooks/useClickOutside';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useClickOutside(searchRef, () => {
        setSuggestions([]);
    });

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedSearchTerm) {
                setLoading(true);
                try {
                    const response = await axios.get(`/api/search?q=${debouncedSearchTerm}`);
                    setSuggestions(response.data);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                    setSuggestions([]);
                } finally {
                    setLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        };
        fetchSuggestions();
    }, [debouncedSearchTerm]);

    const handleSuggestionClick = () => {
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <div className="w-full flex-1 relative" ref={searchRef}>
            <div className="w-full flex border border-gray-300 rounded-md">
                <input
                    type="text"
                    placeholder="Search for products, brands and more"
                    className="flex-1 px-4 py-3 focus:outline-none rounded-l-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="px-4 flex items-center justify-center bg-gray-100 rounded-r-md">
                    <Search className="text-gray-500" />
                </div>
            </div>

            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md shadow-lg z-10">
                    {loading ? (
                        <li className="px-4 py-2 text-gray-500">Loading...</li>
                    ) : (
                        suggestions.map((product) => (
                            <li key={product._id}>
                                <Link
                                    to={`/product/${product._id}`}
                                    className="block px-4 py-2 hover:bg-gray-100"
                                    onClick={handleSuggestionClick}
                                >
                                    {product.name}
                                </Link>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
