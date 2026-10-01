import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import EFICLogo from '@/assets/EFIC-LOGO.png';
import { orgAbbr, orgName } from '@/data/eficData';

interface FooterProps {
    onSectionNavigate?: (sectionId: string) => void;
}

const Footer = ({ onSectionNavigate }: FooterProps) => {
    const footerItems: Array<{ type: 'section'; id: string; label: string } | { type: 'route'; path: string; label: string } | { type: 'page'; path: string; label: string }> = [
        { type: 'section', id: 'home', label: 'Home' },
        { type: 'section', id: 'about', label: 'About Us' },
        { type: 'section', id: 'projects', label: 'Our Projects' },
        { type: 'section', id: 'contact', label: 'Contact Us' },
        { type: 'route', path: '/support', label: 'Support EFIC' },
        { type: 'page', path: 'https://wings.efic.lk', label: 'EFIC Wings' }
    ];

    const socialLinks = [
        { name: 'Facebook', href: '#', Icon: FaFacebookF },
        { name: 'Instagram', href: '#', Icon: FaInstagram },
        { name: 'Twitter', href: '#', Icon: FaTwitter },
        { name: 'WhatsApp', href: '#', Icon: FaWhatsapp }
    ];

    return (
        <footer className="bg-gradient-to-b from-white to-gray-100 border-t border-gray-200 py-8 md:py-12 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
                    <div>
                        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                            <Link to="/" aria-label="EFIC Home">
                                <img src={EFICLogo} alt="EFIC Logo" className="w-8 h-8 md:w-10 md:h-10" />
                            </Link>
                            <h4 className="text-lg md:text-xl font-bold text-[#0071BC]">{orgAbbr}</h4>
                        </div>
                        <p className="text-gray-600 text-xs md:text-sm">
                            {orgName} - providing free, quality education to underprivileged communities in Kalmunai, Sri Lanka since 2001.
                        </p>
                    </div>

                    <div>
                        <h5 className="font-bold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">Quick Links</h5>
                        <div className="space-y-2">
                            {footerItems.map((item) => {
                                if (item.type === 'section' && onSectionNavigate) {
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={() => onSectionNavigate(item.id)}
                                            className="block text-gray-600 hover:text-[#0071BC] transition-colors text-left text-sm md:text-base"
                                        >
                                            {item.label}
                                        </button>
                                    );
                                }

                                if (item.type === 'section') {
                                    return (
                                        <Link
                                            key={item.id}
                                            to="/"
                                            state={{ scrollTo: item.id }}
                                            className="block text-gray-600 hover:text-[#0071BC] transition-colors text-left text-sm md:text-base"
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                }

                                if (item.type === 'route') {
                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="block text-gray-600 hover:text-[#0071BC] transition-colors text-left text-sm md:text-base"
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                }

                                return (
                                    <a
                                        key={item.path}
                                        href={item.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-gray-600 hover:text-[#0071BC] transition-colors text-left text-sm md:text-base"
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h5 className="font-bold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">Help</h5>
                        <div className="space-y-2 text-gray-600 text-sm md:text-base">
                            <Link to="/help/enroll" className="block hover:text-[#0071BC] transition-colors">
                                Enroll as Student
                            </Link>
                            <Link to="/help/qa" className="block hover:text-[#0071BC] transition-colors">
                                Q&A
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h5 className="font-bold text-gray-800 mb-3 md:mb-4 text-sm md:text-base">Support Us</h5>
                        <p className="text-gray-600 text-xs md:text-sm mb-2">
                            Help us build a permanent facility on our land to continue providing free services for generations.
                        </p>
                        <div className="flex mt-4 gap-3">
                            {socialLinks.map(({ name, href, Icon }) => (
                                <a
                                    key={name}
                                    href={href}
                                    className="inline-flex w-8 md:w-10 aspect-square shrink-0 items-center justify-center rounded-full bg-gray-100 hover:bg-[#0071BC] hover:text-white transition-all duration-300 text-xs md:text-sm"
                                    aria-label={name}
                                >
                                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                </a>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-sm md:text-base text-gray-600">
                            <Heart className="w-4 h-4 text-[#ED1C24]" />
                            <span>100% Free - Since 2001</span>
                        </div>
                    </div>
                </div>

                <div className="pt-6 md:pt-8 border-t border-gray-200 text-center text-gray-600 text-xs md:text-sm">
                    <p className="mb-1 md:mb-2">© {new Date().getFullYear()} {orgName}, Kalmunai, Sri Lanka. All rights reserved.</p>
                    <p className="mt-2">In memory of Marhoom H.L.M. Thanzeel &amp; A.M. Sathik</p>
                    <p className="italic text-xs max-w-md mx-auto mt-4 md:mt-6">
                        "Always remember that when you were born you were crying while others around you were
                        laughing, therefore, work very hard during your lifetime and do good things so you die
                        satisfied and laughing while others around you cry"
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;