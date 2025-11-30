import React from 'react';
import { AnimatePresence, motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Swiper, SwiperSlide, useSwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slidesData = [
    { id: 1, image: "/img/igor-bumba-rkaahInFlBg-unsplash.jpg", title: "Amazing Deals Daily", subtitle: "Don't miss out on our special offers.", cta: "product-list Deals", ctaLink: "/deals" },
    { id: 2, image: "/img/gr-stocks-q8P8YoR6erg-unsplash.jpg", title: "Welcome to Vendora", subtitle: "Your one-stop product-list for all your needs!", cta: "Explore Now", ctaLink: "/products" },
    { id: 3, image: "/img/steven-lozano-m56XrhM9a_4-unsplash.jpg", title: "Discover Unique Products", subtitle: "Handpicked items just for you.", cta: "View Collection", ctaLink: "/collections/unique" },
    { id: 4, image: "/img/road-trip-with-raj-aa4sXii77zI-unsplash.jpg", title: "Fast Shipping", subtitle: "Get your products delivered in no time.", cta: "Learn More", ctaLink: "/shipping-info" },
];

const HeroSlide = ({ slide }) => {
    const swiperSlide = useSwiperSlide();

    const textVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          staggerChildren: 0.2,
          delayChildren: 0.3,
          ease: "easeOut",
          duration: 0.5
        }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };

    return (
      <div className="relative w-full h-full sm:h-[500px] lg:h-[600px]">
        <img src={slide.image} alt={slide.title} className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-in-out ${swiperSlide.isActive ? 'scale-110' : 'scale-100'}`} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence>
            {swiperSlide.isActive && (
              <motion.div
                className="max-w-2xl text-white p-8 md:p-16 text-center"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</motion.h1>
                <motion.p variants={itemVariants} className="text-lg md:text-xl mb-8">{slide.subtitle}</motion.p>
                {/* <motion.a variants={itemVariants} href={slide.ctaLink} className="bg-indigo-500 text-white font-bold py-3 px-8 rounded-md hover:bg-indigo-600 transition-colors duration-300">{slide.cta}</motion.a> */}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
};

const HeroSlider = () => (
    <div className="relative group">
      <Swiper
        pagination={{ dynamicBullets: true, clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[500px] lg:h-[600px] w-full overflow-hidden"
      >
        {slidesData.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <HeroSlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-button-prev-custom absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-10 bg-black/20 text-white rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/40">
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button className="swiper-button-next-custom absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-10 bg-black/20 text-white rounded-full w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/40">
        <FiChevronRight className="w-6 h-6" />
      </button>
    </div>
);

export default HeroSlider;