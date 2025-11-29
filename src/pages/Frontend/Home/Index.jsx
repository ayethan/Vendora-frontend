import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import HeroSlider from "./HeroSlider";
import ValuePropositions from "./ValuePropositions";
import FeaturedCategories from "./FeaturedCategories";
import PromoSection from "./PromoSection";
import FeaturedProducts from "./FeaturedProducts";
import Testimonials from "./Testimonials";
import BlogSection from "./BlogSection";
import AnimatedSection from "./AnimatedSection";

function Index() {

  return (
    <div className="bg-white min-h-screen">
      <HeroSlider />
      <AnimatedSection><ValuePropositions /></AnimatedSection>
      <AnimatedSection><FeaturedCategories /></AnimatedSection>
      <AnimatedSection><PromoSection /></AnimatedSection>
      <AnimatedSection><FeaturedProducts /></AnimatedSection>
      <AnimatedSection><Testimonials /></AnimatedSection>
      <AnimatedSection><BlogSection /></AnimatedSection>
    </div>
  );
}

export default Index;
