import React from 'react'
import { Minus, Plus } from 'lucide-react';

import {Collapse} from 'react-collapse';

const brandData = [
    {id: 1, name: 'Brand A' },
    {id: 2, name: 'Brand B' },
    {id: 3, name: 'Brand C' },
    {id: 4, name: 'Brand D' },
];

function Sidebar({ categoriesData, onFilterChange, selectedCategories, selectedBrands }) {
    const [isOpenCategory, setIsOpenCategory] = React.useState(true);
    const toggleCategory = () => setIsOpenCategory(!isOpenCategory);

    const [isOpenBrand, setIsOpenBrand] = React.useState(true);
    const toggleBrand = () => setIsOpenBrand(!isOpenBrand);

    return (
    <div>
        Filter
        <div className='bg-white p-4 mb-6 rounded shadow'>
          <div className='mb-3'>
            <button onClick={toggleCategory} aria-expanded={isOpenCategory} className="w-full flex justify-between items-center cursor-pointer px-3 py-2 rounded bg-white hover:bg-gray-100">
              <span className="text-lg font-medium">
                Category Collapse

              </span>
              {isOpenCategory ? (
                <span className="ml-2"> <Minus /></span>
              ) : (
                <span className="ml-2"><Plus /></span>
              )}

            </button>

            <Collapse isOpened={isOpenCategory} >
              <div className='px-3 py-2 text-gray-500'>
                <ul className='space-y-2'>
                  {categoriesData.map((category) => (
                    <li key={category.id} className="capitalize flex justify-between items-center">
                      <input  type="checkbox" id={`category-${category.id}`} name="category" value={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => onFilterChange('category', category.id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                      <label htmlFor={`category-${category.id}`} className="ml-3 min-w-0 flex-1 text-gray-600 hover:cursor-pointer">
                          {category.name}
                      </label>

                    </li>
                  ))}
                </ul>
              </div>
            </Collapse>

          </div>
          <div className='mb-3'>
            <button onClick={toggleBrand} aria-expanded={isOpenBrand} className="w-full flex justify-between items-center cursor-pointer px-3 py-2 rounded bg-white hover:bg-gray-100">
              <span className="text-lg font-medium">
                Brand Collapse

              </span>
              {isOpenBrand ? (
                <span className="ml-2"> <Minus /></span>
              ) : (
                <span className="ml-2"><Plus /></span>
              )}

            </button>

            <Collapse isOpened={isOpenBrand}>
              <div className='px-3 py-2 text-gray-500'>
                <ul className='space-y-2'>
                  {brandData.map((brand) => (
                    <li key={brand.id} className="capitalize flex justify-between items-center">
                      <input  type="checkbox" id={`brand-${brand.id}`} name="brand" value={brand.id}
                      checked={selectedBrands.includes(brand.id)}
                      onChange={() => onFilterChange('brand', brand.id)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                      <label htmlFor={`brand-${brand.id}`} className="ml-3 min-w-0 flex-1 text-gray-600 hover:cursor-pointer">
                          {brand.name}
                      </label>

                    </li>
                  ))}
                </ul>
              </div>
            </Collapse>

          </div>
        </div>
      </div>
    )
}

export default Sidebar
