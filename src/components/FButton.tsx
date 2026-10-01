import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const ContactFloatingButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const phoneNumber = '+94778951324';

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle WhatsApp click
    const handleWhatsApp = () => {
        window.open(`https://wa.me/${phoneNumber}`, '_blank');
        setIsOpen(false);
    };

    // Handle phone call
    const handleCall = () => {
        window.open(`tel:${phoneNumber}`);
        setIsOpen(false);
    };

    return (
        <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
            {/* WhatsApp Button (Main) */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative bg-gradient-to-r from-[#39B54A] to-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 ${isOpen ? 'rotate-45' : ''}`}
                aria-label="Contact options"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            exit={{ rotate: 180, scale: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="whatsapp"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Contact Options Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        transition={{ duration: 0.2, staggerChildren: 0.1 }}
                        className="absolute bottom-16 right-0 flex flex-col gap-3 items-end"
                    >
                        {/* WhatsApp Option */}
                        <motion.button
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ delay: 0.1 }}
                            onClick={handleWhatsApp}
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 bg-white rounded-full shadow-xl px-4 py-3 text-gray-700 hover:shadow-2xl transition-all duration-300 group"
                        >
                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                WhatsApp
                            </span>

                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-lg">
                                <FaWhatsapp className="w-5 h-5 text-white" />
                            </div>

                        </motion.button>

                        {/* Call Option */}
                        <motion.button
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 20, opacity: 0 }}
                            transition={{ delay: 0.2 }}
                            onClick={handleCall}
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 bg-white rounded-full shadow-xl px-4 py-3 text-gray-700 hover:shadow-2xl transition-all duration-300 group"
                        >
                            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                                Call Us
                            </span>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0071BC] to-[#39B54A] flex items-center justify-center shadow-lg">
                                <Phone className="w-5 h-5 text-white" />
                            </div>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tooltip */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: 2.4 } // delay ONLY when appearing
                        }}
                        exit={{
                            opacity: 0,
                            y: 10,
                            transition: { delay: 0 } // hides instantly
                        }}
                        className="absolute bottom-16 right-0 mb-2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
                    >
                        Contact Us
                        <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-gray-900 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ContactFloatingButton;