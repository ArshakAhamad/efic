import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Users,
    Globe,
    ChevronRight,
    GraduationCap,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Award,
    Star,
    Heart,
    Globe as GlobeIcon,
    Book,
    BookOpen,
    HelpCircle,
} from "lucide-react";
import ContactFloatingButton from "@/components/FButton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO, { StructuredData } from "@/components/SEO";
import FloatingShapes from "@/components/FloatingShapes";
import ContactForm from "../components/ContactForm";
import ProjectsGrid from "../components/ProjectsGrid";
import {
    vision,
    mission,
    values,
    stats as realStats,
    testimonials as realTestimonials,
    contact,
    future,
    orgName,
    orgAbbr,
} from "../data/eficData";
import { seoConfig } from "@/data/seoConfig";

// Type definition for stat items
interface StatItem {
    value: string;
    label: string;
    icon: string;
}

// CountUpAnimation Component 
const CountUpAnimation = ({ 
    targetValue, 
    suffix = '', 
    duration = 2 
}: { 
    targetValue: number; 
    suffix?: string; 
    duration?: number;
}) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const end = targetValue;
                    const increment = end / (duration * 60); // 60fps
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 1000 / 60);
                    
                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [targetValue, duration, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const wingsAppUrl = "https://wings.efic.lk";

    const homeRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    // Read header height for proper scroll offset.
    useEffect(() => {
        const updateHeaderHeight = () => {
            const header = document.querySelector("header");
            setHeaderHeight(header ? (header as HTMLElement).offsetHeight : 0);
        };

        updateHeaderHeight();
        window.addEventListener("resize", updateHeaderHeight);
        return () => window.removeEventListener("resize", updateHeaderHeight);
    }, []);

    // Floating particles animation (reduced count for performance)
    useEffect(() => {
        const container = document.querySelector(".particles-container");
        if (!container) return;

        const createParticle = () => {
            const particle = document.createElement("div");
            particle.className =
                "absolute rounded-full bg-gradient-to-r from-[#0071BC]/20 to-[#39B54A]/20";
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 20 + 10}px`;
            particle.style.height = particle.style.width;
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            container.appendChild(particle);
        };

        // Reduced from 15 to 8 for better performance on low-end devices
        for (let i = 0; i < 8; i++) createParticle();

        return () => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    // Handle section navigation targets from other pages in one click.
    useEffect(() => {
        if (location.pathname !== "/") return;

        const stateSection = (location.state as { scrollTo?: string } | null)?.scrollTo;
        const hashSection = location.hash.replace("#", "");
        const targetSection = stateSection || hashSection;
        if (!targetSection) return;

        const timer = window.setTimeout(() => {
            scrollToSection(targetSection);

            // Consume navigation target once so refresh/back does not jump again.
            navigate(`${location.pathname}${location.search}`, {
                replace: true,
                state: null,
            });
        }, 60);

        return () => window.clearTimeout(timer);
    }, [location.pathname, location.hash, location.search, location.state, headerHeight, navigate]);

    // Map icon strings to components for stats
    const statIconMap: Record<string, React.ElementType> = {
        GraduationCap,
        Users,
        Heart,
        Award,
    };

    const homeKeywords = [
        "EFIC",
        "Effulgent Forum of Independent Committee",
        "Kalmunai education projects",
        "free community schooling Sri Lanka",
        "EFIC Wings PWA",
        "Sri Lanka NGO",
        "volunteer teachers Kalmunai"
    ];

    const heroImageUrl = `${seoConfig.siteUrl}${seoConfig.defaultImage}`;

    const homeStructuredData: StructuredData[] = [
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${seoConfig.siteUrl}#home`,
            url: seoConfig.siteUrl,
            name: `${orgAbbr} | ${orgName}`,
            description: "Landing page for EFIC, a non-profit delivering free education, STEM labs, sports and community uplift programs in Kalmunai, Sri Lanka.",
            isPartOf: {
                "@id": `${seoConfig.siteUrl}#website`
            },
            about: {
                "@id": `${seoConfig.siteUrl}#organization`
            },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: heroImageUrl
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: seoConfig.siteUrl
                },
                {
                    "@type": "ListItem",
                    position: 2,
                    name: "EFIC Wings",
                    item: `${seoConfig.siteUrl}/wings`
                }
            ]
        },
        {
            "@context": "https://schema.org",
            "@type": "Dataset",
            name: `${orgAbbr} education impact metrics`,
            description: "Key indicators summarizing EFIC's annual reach across students, volunteers, and university entries.",
            creator: {
                "@id": `${seoConfig.siteUrl}#organization`
            },
            variableMeasured: realStats.map((stat) => ({
                "@type": "PropertyValue",
                name: stat.label,
                value: stat.value
            }))
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-white text-gray-900 font-sans overflow-hidden relative">
            <SEO
                title="EFIC - Effulgent Forum of Independent Committee"
                description="EFIC provides 100% free education, STEM labs, sports and digital access for underprivileged students in Kalmunai, Sri Lanka."
                path="/"
                keywords={homeKeywords}
                structuredData={homeStructuredData}
            />

            {/* Animated Background Particles */}
            <div className="particles-container absolute inset-0 overflow-hidden pointer-events-none" />

            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-1/4 left-10 w-6 h-6 rounded-full bg-gradient-to-r from-[#0071BC]/30 to-transparent blur-sm"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 right-20 w-8 h-8 rounded-full bg-gradient-to-r from-[#39B54A]/20 to-transparent blur-sm"
            />
            <motion.div
                animate={{ x: [0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                className="absolute bottom-1/4 left-1/4 w-10 h-10 rounded-full bg-gradient-to-r from-[#ED1C24]/10 to-transparent blur-sm"
            />

            <Header onSectionNavigate={scrollToSection} />

            {/* Main Content */}
            <main className="pt-20 md:pt-28 pb-20 px-4 sm:px-6 relative z-10">
                {/* Hero Section */}
                <section
                    id="home"
                    ref={homeRef}
                    className="max-w-7xl mx-auto mt-4 lg:mt-6 mb-16 md:mb-20 lg:mb-24 scroll-mt-24"
                >
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-8 -left-8 md:-top-10 md:-left-10 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-full blur-2xl md:blur-3xl"
                            />

                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-full mb-6">
                                <Heart className="w-4 h-4 text-[#ED1C24]" />
                                <span className="text-sm font-medium text-[#0071BC]">
                                    Quality Education Since 2001
                                </span>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6"
                            >
                                <span className="bg-gradient-to-r from-[#0071BC] via-[#39B54A] to-[#ED1C24] bg-clip-text text-transparent">
                                    Empowering
                                </span>
                                <br />
                                <span className="text-gray-800">Underprivileged Communities</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-sm md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 md:mb-10 px-4"
                            >
                                Founded in 2001 by a group of old students to combat school dropouts and provide
                                free, quality education to the children of Kalmunai, Sri Lanka.
                            </motion.p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8 md:mb-10">
                                {[
                                    { text: "Established 2001", icon: <Calendar className="w-4 h-4" /> },
                                    { text: "Grade 6 to GCE A/L", icon: <Book className="w-4 h-4" /> },
                                    { text: "Certified & Accredited", icon: <Heart className="w-4 h-4" /> },
                                    { text: "Volunteer Teachers", icon: <Users className="w-4 h-4" /> },
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="flex items-center gap-2 p-3 px-5 lg:px-4 bg-white rounded-xl shadow-md border border-gray-100"
                                    >
                                        <div className="text-[#39B54A]">{item.icon}</div>
                                        <span className="text-sm font-medium text-gray-700">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.open(wingsAppUrl, "_blank", "noopener,noreferrer")}
                                    className="group w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#0071BC] to-[#39B54A] text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                                        Open EFIC Wings
                                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-[#39B54A] to-[#0071BC]"
                                        initial={{ x: "100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection("about")}
                                    className="w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 bg-white text-[#0071BC] rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg border-2 border-[#0071BC]/20 hover:border-[#0071BC] transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    Learn More
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* About Us Section */}
                <section
                    id="about"
                    ref={aboutRef}
                    className="max-w-7xl mx-auto mb-16 md:mb-20 lg:mb-24 scroll-mt-24"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center"
                    >
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-full mb-4 md:mb-6">
                                <GlobeIcon className="w-4 h-4 text-[#0071BC]" />
                                <span className="text-sm font-medium text-[#0071BC]">EFIC</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                                About <span className="text-[#39B54A]">Us</span>
                            </h2>
                            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Our Mission</h3>
                            <p className="text-gray-600 mb-4 md:mb-6">{mission}</p>
                            <h3 className="text-xl font-bold text-gray-800 mt-6 mb-2">Our Vision</h3>
                            <p className="text-gray-600 mb-4">{vision}</p>
                        </div>

                        {/* Silver Jubilee Card */}
                        <div className="order-1 md:order-2 relative duration-300">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <div className="relative aspect-square md:aspect-[4/3] bg-gradient-to-br from-[#0071BC]/20 via-[#39B54A]/20 to-[#C0C0C0]/30 p-6 md:p-10 lg:p-12 overflow-hidden">
                                    <div className="absolute inset-0 opacity-10">
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute border-2 border-silver/30 rounded-full"
                                                style={{
                                                    left: `${Math.random() * 80 + 10}%`,
                                                    top: `${Math.random() * 80 + 10}%`,
                                                    width: `${Math.random() * 150 + 50}px`,
                                                    height: `${Math.random() * 150 + 50}px`,
                                                }}
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, 180, 360],
                                                }}
                                                transition={{
                                                    duration: Math.random() * 10 + 10,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <FloatingShapes />

                                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                                        <div className="mb-4 md:mb-6 relative -mt-8 lg:mt-4">
                                            <div className="relative px-5 py-2 bg-gradient-to-r from-[#0071BC] via-[#39B54A] to-[#C0C0C0] rounded-full overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                                <span className="relative text-white font-bold text-xs md:text-md tracking-wider">
                                                    🎉 SILVER JUBILEE CELEBRATION 🎉
                                                </span>
                                            </div>
                                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#39B54A]" />
                                        </div>
                                        <h3 className="text-5xl lg:text-6xl font-bold mb-3 md:mb-4 px-4">
                                            <span className="bg-gradient-to-r from-[#0071BC] via-[#39B54A] to-silver bg-clip-text text-transparent">
                                                Quarter Century of
                                            </span>
                                            <br />
                                            <span className="text-gray-800">Excellence</span>
                                        </h3>
                                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-6 md:mb-8 px-4">
                                            Shaping futures with free quality education since 2001
                                        </p>

                                        <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-md mb-6 md:mb-8 px-4">
                                            <motion.div
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                className="bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-white/50"
                                            >
                                                <div className="text-xl md:text-2xl font-bold text-[#0071BC]">2001</div>
                                                <div className="text-xs text-gray-600 font-semibold">FOUNDING</div>
                                            </motion.div>

                                            <motion.div
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                className="bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-white/50"
                                            >
                                                <div className="text-xl md:text-2xl font-bold text-[#39B54A]">25</div>
                                                <div className="text-xs text-gray-600 font-semibold">YEARS</div>
                                            </motion.div>

                                            <motion.div
                                                whileHover={{ y: -5, scale: 1.05 }}
                                                className="bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-xl shadow-lg border border-white/50 col-span-2 md:col-span-1"
                                            >
                                                <div className="text-xl md:text-2xl font-bold text-silver">2026</div>
                                                <div className="text-xs text-gray-600 font-semibold">JUBILEE</div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -mb-6 lg:-mr-6 -bottom-3 -right-3 md:-bottom-4 md:-right-4 z-10">
                                <motion.div
                                    initial={{ scale: 0, rotate: -10 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.3, type: "spring" }}
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    className="relative w-32 h-32 md:w-32 md:h-32 lg:w-40 lg:h-40"
                                >
                                    <div className="absolute rounded-full inset-0 bg-gradient-to-r from-[#0071BC] via-[#39B54A] to-silver blur-md opacity-96 animate-pulse" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-silver to-white rounded-full blur-lg opacity-60" />
                                    <div className="absolute inset-2 bg-gradient-to-br from-silver to-white rounded-full border-4 border-silver shadow-2xl">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-800">
                                                25
                                            </span>
                                            <span className="text-sm md:text-sm font-bold text-gray-600 uppercase tracking-widest">
                                                Years
                                            </span>
                                            <div className="mt-1 px-2 md:py-0.5 bg-gradient-to-r from-[#0071BC] to-[#39B54A] rounded-full">
                                                <span className="relative text-[8px] md:text-xs text-white font-bold">
                                                    JUBILEE
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#0071BC] opacity-80" />
                                    <div className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full bg-[#39B54A] opacity-80" />
                                    <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-silver opacity-80" />
                                    <div className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-silver opacity-80" />
                                </motion.div>
                            </div>

                            <div className="absolute top-2 right-2 md:top-3 md:right-3">
                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-r from-[#0071BC] to-[#39B54A] opacity-20" />
                            </div>
                            <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3">
                                <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-r from-[#39B54A] to-silver opacity-20" />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Projects Grid */}
                <section
                    id="projects"
                    ref={projectsRef}
                    className="max-w-7xl mx-auto mb-16 md:mb-20 lg:mb-24 scroll-mt-24"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-2 md:mb-4"
                    >
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
                            Our <span className="text-[#0071BC]">Projects</span>
                        </h3>
                        <p className="text-gray-600 text-base md:text-lg">
                            Real initiatives delivering free education and community development
                        </p>
                    </motion.div>
                    <ProjectsGrid hoveredCard={hoveredCard} setHoveredCard={setHoveredCard} />
                </section>

                {/* Stats Section with Animated Number Count */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 mb-16 md:mb-20 lg:mb-24 backdrop-blur-sm border border-white/20"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                        {realStats.map((stat, index) => {
                            const IconComponent = statIconMap[stat.icon] || HelpCircle;
                            const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''));
                            const hasPlus = stat.value.includes('+');
                            const hasPercent = stat.value.includes('%');
                            
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0071BC] mb-1 md:mb-2">
    <CountUpAnimation 
        targetValue={numericValue} 
        suffix={hasPlus ? '+' : (hasPercent ? '%' : '')}
        duration={2}
    />
</div>
                                    <div className="text-gray-600 text-sm md:text-base flex flex-col items-center gap-1">
                                        <span className="text-[#39B54A]">
                                            <IconComponent className="w-4 h-4 md:w-5 md:h-5" />
                                        </span>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Testimonials */}
                <section className="max-w-7xl mx-auto mb-16 md:mb-20 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
                            What Our <span className="text-[#39B54A]">Community</span> Says
                        </h3>
                        <p className="text-gray-600 text-base md:text-lg">Hear from students and parents</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                        {realTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.2 }}
                                className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex gap-1 mb-3 md:mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic text-sm md:text-base mb-4 md:mb-6">
                                    "{testimonial.content}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-[#0071BC] to-[#39B54A] flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm md:text-base">{testimonial.name}</h4>
                                        <p className="text-xs md:text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Support Our Mission Section (Permanent Building) */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="max-w-4xl mx-auto text-center relative overflow-hidden rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 mb-16 md:mb-20 lg:mb-24 bg-gradient-to-br from-[#0071BC]/5 to-[#39B54A]/5 border border-gray-200"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0071BC] via-[#39B54A] to-[#ED1C24] opacity-5" />
                    <div className="relative z-10">
                        <Heart className="w-12 h-12 md:w-16 md:h-16 text-[#ED1C24] mx-auto mb-4" />
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4 md:mb-6">
                            Help Us Build a Permanent Home
                        </h3>
                        <p className="text-gray-600 text-base md:text-lg mb-4 max-w-2xl mx-auto">
                            {future.need}
                        </p>
                        <p className="text-gray-600 text-sm md:text-base mb-6">
                            {future.description} Monthly running cost: {future.monthlyCost}.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/support")}
                                className="px-6 py-3 md:px-10 md:py-4 bg-gradient-to-r from-[#0071BC] to-[#39B54A] text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                            >
                                <span className="flex items-center justify-center gap-2 md:gap-3">
                                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                                    Support EFIC
                                </span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection("contact")}
                                className="px-6 py-3 md:px-10 md:py-4 bg-white text-[#0071BC] rounded-xl md:rounded-2xl font-bold text-base md:text-lg border-2 border-[#0071BC]/20 hover:border-[#0071BC] transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Contact Us
                            </motion.button>
                        </div>
                    </div>
                </motion.section>

                {/* Contact Us Section */}
                <section
                    id="contact"
                    ref={contactRef}
                    className="max-w-7xl mx-auto mb-16 md:mb-20 lg:mb-24 scroll-mt-24"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-gradient-to-br from-white to-blue-50 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Contact Info */}
                            <div className="p-6 md:p-8 lg:p-12">
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">
                                    Get in <span className="text-[#0071BC]">Touch</span>
                                </h3>
                                <p className="text-gray-600 mb-6 md:mb-8">
                                    Have questions? Reach out to our team for any inquiries or to support our mission.
                                </p>

                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="p-2 md:p-3 bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-lg md:rounded-xl">
                                            <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 text-sm md:text-base">Address</h4>
                                            <p className="text-gray-600 text-sm md:text-base">{contact.address}</p>
                                        </div>
                                    </div>
                                    {contact.phones.map((phone, idx) => (
                                        <div key={idx} className="flex items-start gap-3 md:gap-4">
                                            <div className="p-2 md:p-3 bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-lg md:rounded-xl">
                                                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-800 text-sm md:text-base">Phone</h4>
                                                <p className="text-gray-600 text-sm md:text-base">{phone}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="flex items-start gap-3 md:gap-4">
                                        <div className="p-2 md:p-3 bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-lg md:rounded-xl">
                                            <Mail className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-800 text-sm md:text-base">Email</h4>
                                            <p className="text-gray-600 text-sm md:text-base">{contact.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 md:mt-10">
                                    <h4 className="font-bold text-gray-800 mb-3 md:mb-4">Office Hours</h4>
                                    <div className="space-y-2">
                                        {contact.hours.map((item, idx) => (
                                            <div key={idx} className="flex justify-between">
                                                <span className="text-gray-600 text-sm md:text-base">{item.days}</span>
                                                <span className="font-medium text-sm md:text-base">{item.hours}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <ContactForm />
                        </div>
                    </motion.div>
                </section>

                {/* Values & Principles Section */}
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="min-w-8xl mx-auto py-6 relative overflow-hidden rounded-2xl md:rounded-3xl p-4 md:p-12 lg:p-16 mb-6 md:mb-10 lg:mb-4"
                >
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0071BC] via-[#39B54A] to-[#ED1C24] opacity-5" />

                    <div className="relative z-10">
                        {/* Section header */}
                        <div className="text-center mb-10 md:mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-4">
                                <Heart className="w-4 h-4 text-[#ED1C24]" />
                                <span className="text-sm font-medium text-[#0071BC]">What We Stand For</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-800">
                                Our <span className="text-[#39B54A]">Values & Principles</span>
                            </h3>
                            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                                The core beliefs that guide every step of our journey.
                            </p>
                        </div>

                        {/* Values grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                            {values.map((value, index) => {
                                const icons = [
                                    <BookOpen className="w-6 h-6 text-[#0071BC]" />,
                                    <Users className="w-6 h-6 text-[#39B54A]" />,
                                    <Globe className="w-6 h-6 text-[#ED1C24]" />,
                                    <Heart className="w-6 h-6 text-[#0071BC]" />,
                                ];
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="bg-white/90 backdrop-blur-sm rounded-xl py-4 px-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="flex flex-col items-center text-center">
                                            <div className="px-2 py-2 rounded-full bg-gradient-to-br from-[#0071BC]/10 to-[#39B54A]/10 mb-4">
                                                {icons[index % icons.length]}
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed">{value}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.section>
            </main>

            <Footer onSectionNavigate={scrollToSection} />

            {/* Floating WhatsApp Button */}
            <ContactFloatingButton />

        </div>
    );
};

export default Home;
