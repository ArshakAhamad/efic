import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface ContactFormData {
    user_name: string;
    user_email: string;
    user_phone: string;
    message: string;
}

interface ContactFormProps {
    className?: string;
}

const ContactForm = ({ className = '' }: ContactFormProps) => {
    const form = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState<ContactFormData>({
        user_name: '',
        user_email: '',
        user_phone: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [buttonState, setButtonState] = useState<'normal' | 'error' | 'success' | 'loading'>('normal');
    const [buttonMessage, setButtonMessage] = useState('Send Message');
    const [shake, setShake] = useState(false);
    const [phoneInputKey, setPhoneInputKey] = useState(0); // To force re-render

    // EmailJS Configuration - Using Vite's import.meta.env
    const EMAILJS_CONFIG = {
        SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
        TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
        PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
    };

    // Reset button to normal state after 2 seconds for error/success states
    useEffect(() => {
        if (buttonState === 'error' || buttonState === 'success') {
            const timer = setTimeout(() => {
                setButtonState('normal');
                setButtonMessage('Send Message');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [buttonState]);

    const validateForm = (): boolean => {
        if (!formData.user_name.trim()) {
            setButtonState('error');
            setButtonMessage('Please enter your name');
            triggerShake();
            return false;
        }
        if (!formData.user_email.trim()) {
            setButtonState('error');
            setButtonMessage('Please enter your email address');
            triggerShake();
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.user_email)) {
            setButtonState('error');
            setButtonMessage('Please enter a valid email address');
            triggerShake();
            return false;
        }
        if (!formData.user_phone.trim()) {
            setButtonState('error');
            setButtonMessage('Please enter your phone number');
            triggerShake();
            return false;
        }
        if (!formData.message.trim()) {
            setButtonState('error');
            setButtonMessage('Please enter your message');
            triggerShake();
            return false;
        }
        return true;
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setButtonState('loading');
        setButtonMessage('Sending...');

        try {
            // Check if EmailJS is properly configured
            if (!EMAILJS_CONFIG.SERVICE_ID ||
                !EMAILJS_CONFIG.TEMPLATE_ID ||
                !EMAILJS_CONFIG.PUBLIC_KEY) {
                throw new Error('EmailJS is not configured. Please add your credentials to .env file.');
            }

            // Format phone number for display
            const formattedPhone = formData.user_phone.startsWith('+')
                ? formData.user_phone
                : `+${formData.user_phone}`;

            // Create temporary form for EmailJS
            const tempForm = document.createElement('form');
            tempForm.innerHTML = `
                <input type="hidden" name="from_name" value="EFIC" />
                <input type="hidden" name="reply_to" value="${formData.user_email}" />
                <input type="hidden" name="to_name" value="EFIC" />
                <input type="hidden" name="user_name" value="${formData.user_name}" />
                <input type="hidden" name="user_email" value="${formData.user_email}" />
                <input type="hidden" name="user_phone" value="${formattedPhone}" />
                <input type="hidden" name="message" value="${formData.message}" />
            `;

            // Send email using EmailJS
            const result = await emailjs.sendForm(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                tempForm,
                EMAILJS_CONFIG.PUBLIC_KEY
            );

            if (result.status === 200) {
                setButtonState('success');
                setButtonMessage('Message sent successfully!');

                // Reset form
                setFormData({
                    user_name: '',
                    user_email: '',
                    user_phone: '',
                    message: ''
                });

                // Force phone input to reset
                setPhoneInputKey(prev => prev + 1);

            } else {
                throw new Error('Failed to send message. Try later.');
            }
        } catch (err: any) {
            console.error('EmailJS Error:', err);

            // User-friendly error messages
            let errorMessage = 'Something went wrong. Try later.';

            if (err.text) {
                if (err.text.includes('Invalid template ID')) {
                    errorMessage = 'Email service configuration error';
                } else if (err.text.includes('Invalid user ID')) {
                    errorMessage = 'Email service configuration error';
                } else if (err.text.includes('reCAPTCHA')) {
                    errorMessage = 'reCAPTCHA verification failed';
                }
            } else if (err.message) {
                if (err.message.includes('not configured')) {
                    errorMessage = 'Email service is not configured';
                } else {
                    errorMessage = err.message.length > 30 ? err.message.substring(0, 30) + '...' : err.message;
                }
            }

            setButtonState('error');
            setButtonMessage(errorMessage);
            triggerShake();
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (buttonState === 'error' || buttonState === 'success') {
            setButtonState('normal');
            setButtonMessage('Send Message');
        }
    };

    const handlePhoneChange = (value: string, country: any) => {
        // The value from react-phone-input-2 includes country code without '+'
        // Example: "94771234567" for Sri Lanka
        setFormData(prev => ({
            ...prev,
            user_phone: value
        }));

        if (buttonState === 'error' || buttonState === 'success') {
            setButtonState('normal');
            setButtonMessage('Send Message');
        }
    };

    // Get button style based on state
    const getButtonStyle = () => {
        switch (buttonState) {
            case 'loading':
                return 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed';
            case 'error':
                return 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700';
            case 'success':
                return 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700';
            default:
                return 'bg-gradient-to-r from-[#0071BC] to-[#39B54A] hover:from-[#39B54A] hover:to-[#0071BC]';
        }
    };

    // Get button icon based on state
    const getButtonIcon = () => {
        switch (buttonState) {
            case 'loading':
                return <Loader2 className="w-5 h-5 animate-spin" />;
            case 'error':
                return <AlertCircle className="w-5 h-5" />;
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            default:
                return <Send className="w-5 h-5" />;
        }
    };

    // Check if EmailJS is configured (for development warning)
    const isEmailJSConfigured = EMAILJS_CONFIG.SERVICE_ID &&
        EMAILJS_CONFIG.TEMPLATE_ID &&
        EMAILJS_CONFIG.PUBLIC_KEY;

    return (
        <div className={`bg-gradient-to-br from-[#0071BC]/5 to-[#39B54A]/5 p-6 md:p-8 lg:p-12 ${className}`}>
            <form
                ref={form}
                onSubmit={handleSubmit}
                className={`space-y-4 md:space-y-6 ${shake ? 'animate-shake' : ''}`}
            >
                {/* Hidden fields for EmailJS */}
                <input type="hidden" name="from_name" value="EFIC Institute Website" />
                <input type="hidden" name="reply_to" value={formData.user_email} />
                <input type="hidden" name="to_name" value="EFIC Institute" />
                <input type="hidden" name="user_name" value={formData.user_name} />
                <input type="hidden" name="user_email" value={formData.user_email} />
                <input type="hidden" name="user_phone" value={formData.user_phone} />
                <input type="hidden" name="message" value={formData.message} />

                {/* Name Field */}
                <div className="group">
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-lg md:rounded-xl border border-gray-300 focus:border-[#0071BC] focus:ring-2 focus:ring-[#0071BC]/20 transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Thanzeel"
                    />
                </div>

                {/* Email Field */}
                <div className="group">
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="user_email"
                        value={formData.user_email}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-lg md:rounded-xl border border-gray-300 focus:border-[#39B54A] focus:ring-2 focus:ring-[#39B54A]/20 transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        placeholder="Thanzeel@example.com"
                    />
                </div>

                {/* Phone Field */}
                <div className="group">
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Phone Number
                    </label>
                    <PhoneInput
                        key={phoneInputKey} // Force re-render on reset
                        country={'lk'}
                        value={formData.user_phone}
                        onChange={handlePhoneChange}
                        disabled={loading}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: false
                        }}
                        containerClass="w-full"
                        inputClass="!w-full !px-4 !py-3 !pl-[60px] !rounded-lg md:!rounded-xl !border !border-gray-300 focus:!border-[#0071BC] focus:!ring-2 focus:!ring-[#0071BC]/20 !text-sm md:!text-base"
                        buttonClass="!h-full !rounded-l-lg md:!rounded-l-xl !border-gray-300 !bg-gray-50"
                        dropdownClass="!z-50"
                        enableSearch={true}
                        searchPlaceholder="Search country..."
                        placeholder="+94 77 123 4567"
                        autoFormat={true}
                        disableCountryCode={false}
                        countryCodeEditable={true}
                        enableLongNumbers={true}
                        disableDropdown={false}
                        disableSearchIcon={false}
                    />
                </div>

                {/* Message Field */}
                <div className="group">
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">
                        Message
                    </label>
                    <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full px-4 py-3 rounded-lg md:rounded-xl border border-gray-300 focus:border-[#39B54A] focus:ring-2 focus:ring-[#39B54A]/20 transition-all text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                        placeholder="How can we help you?"
                    />
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: buttonState === 'normal' ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative w-full py-3 md:py-4 text-white rounded-lg md:rounded-xl font-bold md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${getButtonStyle()}`}
                >
                    {getButtonIcon()}
                    <span className={`${buttonState === 'error' ? 'animate-pulse' : ''}`}>
                        {buttonMessage}
                    </span>
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                    Required fields. We'll respond within 24 hours.
                </p>
            </form>

            {/* Configuration Warning - Only shows in development if not configured */}
            {import.meta.env.DEV && !isEmailJSConfigured && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-xs text-yellow-700">
                        ⚠️ EmailJS is not configured. Please replace the placeholder values with your actual EmailJS credentials in .env file.
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                        Required environment variables: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY
                    </p>
                </div>
            )}
        </div>
    );
};

export default ContactForm;