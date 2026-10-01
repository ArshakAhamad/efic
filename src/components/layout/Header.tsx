import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import EFICLogo from '@/assets/EFIC-LOGO.png';
import { orgAbbr } from '@/data/eficData';

interface HeaderProps {
    onSectionNavigate?: (sectionId: string) => void;
}

const Header = ({ onSectionNavigate }: HeaderProps) => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = onSectionNavigate
        ? [
            { id: 'home', label: 'Home', type: 'section' as const },
            { id: 'about', label: 'About Us', type: 'section' as const },
            { id: 'projects', label: 'Our Projects', type: 'section' as const },
            { id: 'contact', label: 'Contact Us', type: 'section' as const },
            { id: 'support', label: 'Support EFIC', type: 'route' as const }
        ]
        : [
            { id: 'home', label: 'Home', type: 'route' as const },
            { id: 'about', label: 'About Us', type: 'hash' as const },
            { id: 'projects', label: 'Our Projects', type: 'hash' as const },
            { id: 'contact', label: 'Contact Us', type: 'hash' as const },
            { id: 'support', label: 'Support EFIC', type: 'route' as const }
        ];

    const handleNavClick = (item: { id: string; type: 'section' | 'route' | 'hash' }) => {
        if (item.type === 'section' && onSectionNavigate) {
            onSectionNavigate(item.id);
            setMobileMenuOpen(false);
            return;
        }

        if (item.type === 'hash') {
            navigate('/', { state: { scrollTo: item.id } });
            setMobileMenuOpen(false);
            return;
        }

        if (item.id === 'home') {
            navigate('/');
        } else {
            navigate('/support');
        }
        setMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 w-full px-4 sm:px-6 py-3 bg-white/95 backdrop-blur-md shadow-lg border-b border-white/20 rounded-b-2xl">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 sm:gap-3 text-gray-800" aria-label="EFIC Home">
                    <img src={EFICLogo} alt="EFIC Logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 drop-shadow-lg" />
                    <div className="block">
                        <h1 className="text-2xl sm:text-xl md:text-2xl font-bold text-[#0071BC] bg-gradient-to-r from-[#0071BC] to-[#39B54A] bg-clip-text text-transparent">
                            {orgAbbr}
                        </h1>
                        <p className="text-xs text-gray-600">Since 2001</p>
                    </div>
                </Link>

                <nav className="hidden lg:flex items-center gap-4 xl:gap-6 ml-auto lg:mr-6 xl:mr-10">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavClick(item)}
                            className="relative px-3 py-2 text-sm xl:text-base font-medium transition-all duration-300 text-gray-600 hover:text-[#39B54A]"
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button
                    type="button"
                    onClick={() => setMobileMenuOpen((prev) => !prev)}
                    className="lg:hidden p-2.5 rounded-xl border border-gray-200 text-gray-700 bg-white/90 shadow-sm"
                    aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 mt-3 overflow-hidden animate-fade-in">
                    <div className="py-4 space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleNavClick(item)}
                                className="block w-full text-left px-6 py-3 font-medium text-gray-600 hover:text-[#39B54A] hover:bg-gray-50"
                            >
                                {item.label}
                            </button>
                        ))}
                        <div className="px-6 py-4 border-t border-gray-100">
                            <a
                                href="https://wings.efic.lk"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full text-center py-3 bg-gradient-to-r from-[#0071BC] to-[#39B54A] text-white rounded-xl font-semibold shadow-lg"
                            >
                                Open Wings
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;