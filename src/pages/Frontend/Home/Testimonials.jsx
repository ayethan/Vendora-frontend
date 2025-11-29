import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonialsData = [
    {
        id: 1,
        quote: "The quality is outstanding, and the customer service was top-notch. I'll definitely be shopping here again!",
        author: "Sarah L.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        id: 2,
        quote: "My order arrived faster than I expected. The packaging was beautiful and the product exceeded my expectations.",
        author: "Michael B.",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        id: 3,
        quote: "An amazing selection of unique products you can't find anywhere else. Five stars!",
        author: "Jessica P.",
        avatar: "https://randomuser.me/api/portraits/women/17.jpg"
    }
];

const Testimonials = () => (
    <div className="bg-white py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative group">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
                <p className="text-lg text-gray-600 mb-12">We are trusted by thousands of happy customers.</p>
            </div>
            <Swiper
                slidesPerView={1}
                navigation={{
                    nextEl: '.testimonials-next',
                    prevEl: '.testimonials-prev',
                }}
                spaceBetween={30}
                loop={true}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Autoplay, Pagination, Navigation]}
                className="pb-12"
            >
                {testimonialsData.map(testimonial => (
                    <SwiperSlide key={testimonial.id}>
                        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                            <img className="w-24 h-24 rounded-full mb-4" src={testimonial.avatar} alt={testimonial.author} />
                            <div className="flex text-yellow-400 mb-4">
                                {[...Array(5)].map((_, i) => <FiStar key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <blockquote className="text-xl italic text-gray-700 mb-4">
                                "{testimonial.quote}"
                            </blockquote>
                            <cite className="font-semibold text-gray-800 not-italic">
                                &mdash; {testimonial.author}
                            </cite>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <button className="testimonials-prev absolute top-1/2 left-2 md:-left-8 -translate-y-1/2 z-10 bg-white/50 text-gray-800 rounded-full shadow-lg w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                <FiChevronLeft className="w-6 h-6" />
            </button>
            <button className="testimonials-next absolute top-1/2 right-2 md:-right-8 -translate-y-1/2 z-10 bg-white/50 text-gray-800 rounded-full shadow-lg w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
                <FiChevronRight className="w-6 h-6" />
            </button>
        </div>
    </div>
);

export default Testimonials;