import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, MapPin, Smartphone, ExternalLink } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageContainer from '@/components/layout/PageContainer';
import SEO from '@/components/SEO';
import ScrollReveal from '@/components/ScrollReveal';

const HelpEnroll = () => {
    const wingsUrl = 'https://wings.efic.lk';

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-white text-gray-900 font-sans overflow-hidden relative">
            <SEO
                title="Enroll as Student"
                description="Learn how new students can join EFIC programs and start their education journey."
                path="/help/enroll"
            />

            <Header />

            <main className="pt-24 md:pt-28 pb-16 md:pb-20">
                <PageContainer>
                    <ScrollReveal className="max-w-4xl mx-auto">
                        <section className="rounded-2xl md:rounded-3xl border border-gray-100 bg-white shadow-lg p-6 md:p-8 lg:p-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-full mb-5">
                                <GraduationCap className="w-4 h-4 text-[#0071BC]" />
                                <span className="text-sm font-medium text-[#0071BC]">Help</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Enroll as Student</h1>
                            <p className="text-gray-600 text-base md:text-lg mb-6">
                                New students can enroll through two easy options. You can visit our office directly,
                                or install EFIC Wings and submit your enrollment from there.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-6">
                                <ScrollReveal delay={0.05}>
                                    <article className="rounded-xl border border-gray-100 bg-gradient-to-r from-white to-blue-50/40 p-5">
                                        <div className="inline-flex items-center gap-2 mb-3">
                                            <MapPin className="w-4 h-4 text-[#0071BC]" />
                                            <h2 className="text-lg font-bold text-gray-800">Visit the Office</h2>
                                        </div>
                                        <p className="text-gray-700 text-sm md:text-base mb-4">
                                            Come to the EFIC office and our team will guide you through enrollment,
                                            class placement, and schedule details.
                                        </p>
                                        <Link
                                            to="/"
                                            state={{ scrollTo: 'contact' }}
                                            className="inline-flex items-center gap-2 text-[#0071BC] font-semibold hover:text-[#39B54A] transition-colors"
                                        >
                                            Go to Contact Section
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </article>
                                </ScrollReveal>

                                <ScrollReveal delay={0.1}>
                                    <article className="rounded-xl border border-gray-100 bg-gradient-to-r from-white to-blue-50/40 p-5">
                                        <div className="inline-flex items-center gap-2 mb-3">
                                            <Smartphone className="w-4 h-4 text-[#39B54A]" />
                                            <h2 className="text-lg font-bold text-gray-800">Enroll with EFIC Wings</h2>
                                        </div>
                                        <p className="text-gray-700 text-sm md:text-base mb-4">
                                            Install EFIC Wings and complete your student enrollment online with guided steps.
                                        </p>
                                        <a
                                            href={wingsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[#0071BC] font-semibold hover:text-[#39B54A] transition-colors"
                                        >
                                            Open EFIC Wings
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </article>
                                </ScrollReveal>
                            </div>

                            <ScrollReveal delay={0.12} className="rounded-xl border border-gray-100 bg-white p-5 mb-6">
                                <h2 className="text-lg font-bold text-gray-800 mb-2">Before You Enroll</h2>
                                <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                                    <li>Student basic details</li>
                                    <li>Current school grade information</li>
                                    <li>Parent or guardian contact number</li>
                                    <li>Preferred subject stream (if applicable)</li>
                                </ul>
                            </ScrollReveal>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    to="/"
                                    state={{ scrollTo: 'contact' }}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0071BC] to-[#39B54A] text-white rounded-xl font-semibold shadow-lg"
                                >
                                    Contact Us to Enroll
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <a
                                    href={wingsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0071BC] rounded-xl font-semibold border border-[#0071BC]/20 hover:border-[#0071BC] transition-colors"
                                >
                                    Install / Open EFIC Wings
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </section>
                    </ScrollReveal>
                </PageContainer>
            </main>

            <Footer />
        </div>
    );
};

export default HelpEnroll;
