import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import HeroSlider from "./Components/HeroSlider";
import ValuePropositions from "./Components/ValuePropositions";
import FeaturedCategories from "./Components/FeaturedCategories";
import PromoSection from "./Components/PromoSection";
import FeaturedProducts from "./Components/FeaturedProducts";
import Testimonials from "./Components/Testimonials";
import BlogSection from "./Components/BlogSection";
import AnimatedSection from "./Components/AnimatedSection";

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
