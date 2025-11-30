import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FiCpu, FiShoppingBag, FiHome, FiBookOpen, FiSmile, FiAward, FiHeart, FiPlusSquare, FiCoffee, FiArchive, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categoriesData = [
    {id: 1, name: 'Electronics', icon: <FiCpu /> }, {id: 2, name: 'Fashion', icon: <FiShoppingBag /> },
    {id: 3,name: 'Books', icon: <FiBookOpen /> },
    {id: 4,name: 'Toys', icon: <FiSmile /> }, {id: 5,name: 'Sports', icon: <FiAward /> },
    {id: 6,name: 'Beauty', icon: <FiHeart /> }, {id: 7, name: 'Health', icon: <FiPlusSquare /> },
    {id: 8,name: 'Food', icon: <FiCoffee /> }, {id: 9, name: 'Furniture', icon: <FiArchive /> },
];

const CategoryCard = ({ category, onCategoryClick }) => (
    <div className="bg-white p-4 rounded-lg shadow text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300
    border border-gray-100 cursor-pointer flex flex-col justify-center items-center h-full"
    onClick={() => onCategoryClick(category.id)}>
      <div className="h-16 w-16 mx-auto mb-3 bg-indigo-100 rounded-full flex items-center justify-center text-red-500 text-3xl">
        {category.icon || category.name.charAt(0)}
      </div>
      <span className="text-sm font-medium text-gray-700">{category.name}</span>
    </div>
);

const FeaturedCategories = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName) => {
        navigate(`/product?category=${categoryName}`);
    };

    return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 my-12 relative group">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Categories</h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        // pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          nextEl: '.featured-categories-next',
          prevEl: '.featured-categories-prev',
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="py-4 fre"
        breakpoints={{
          640: { slidesPerView: 4, spaceBetween: 20 },
          768: { slidesPerView: 6, spaceBetween: 30 },
          1024: { slidesPerView: 8, spaceBetween: 30 },
        }}
        loop={true}
      >
        {categoriesData.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard category={category} onCategoryClick={handleCategoryClick} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="featured-categories-prev absolute top-1/2 left-2 md:-left-4 -translate-y-1/2 z-10 bg-white/80 text-gray-800 rounded-full shadow-md w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100
      transition-opacity duration-300 hover:bg-white mt-9 cursor-pointer">
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button className="featured-categories-next absolute top-1/2 right-2 md:-right-4 -translate-y-1/2 z-10 bg-white/80 text-gray-800 rounded-full shadow-md w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100
      transition-opacity duration-300 hover:bg-white mt-9 cursor-pointer">
        <FiChevronRight className="w-6 h-6" />
      </button>
    </div>
);
}
export default FeaturedCategories;