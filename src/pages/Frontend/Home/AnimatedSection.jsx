import React from 'react';
import { AnimatePresence, motion } from "framer-motion"; // eslint-disable-line no-unused-vars


const AnimatedSection = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    >
        {children}
    </motion.div>
);

export default AnimatedSection;