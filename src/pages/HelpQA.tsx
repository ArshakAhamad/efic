import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, MessageCircleQuestion, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageContainer from '@/components/layout/PageContainer';
import SEO from '@/components/SEO';
import ScrollReveal from '@/components/ScrollReveal';

const faqs = [
    {
        q: 'How can I enroll as a new student?',
        a: 'You can enroll by visiting the EFIC office or through EFIC Wings. See the Enroll as Student help page for guided steps.'
    },
    {
        q: 'Is education at EFIC free?',
        a: 'Yes. EFIC provides free educational support to underprivileged students in the community.'
    },
    {
        q: 'How can I support EFIC projects?',
        a: 'You can use the Support page to donate through PayHere or use the listed bank details for direct support.'
    },
    {
        q: 'Where can I contact EFIC?',
        a: 'Use the Contact section on the Home page for office address, phone numbers, and email details.'
    },
    {
        q: 'What is EFIC Wings?',
        a: 'EFIC Wings is the dedicated online platform where students and members can access services and updates.'
    }
];

const HelpQA = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-white text-gray-900 font-sans overflow-hidden relative">
            <SEO
                title="Q&A"
                description="Frequently asked questions about EFIC programs, support, and contact information."
                path="/help/qa"
            />

            <Header />

            <main className="pt-24 md:pt-28 pb-16 md:pb-20">
                <PageContainer>
                    <ScrollReveal className="max-w-4xl mx-auto">
                        <section className="rounded-2xl md:rounded-3xl border border-gray-100 bg-white shadow-lg p-6 md:p-8 lg:p-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-full mb-5">
                                <HelpCircle className="w-4 h-4 text-[#0071BC]" />
                                <span className="text-sm font-medium text-[#0071BC]">Help</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Q&A</h1>
                            <p className="text-gray-600 text-sm md:text-base mb-6">
                                Common questions and quick answers about enrollment, support, and contact details.
                            </p>

                            <ScrollReveal delay={0.05} className="rounded-xl border border-[#0071BC]/15 bg-gradient-to-r from-[#0071BC]/5 to-[#39B54A]/5 p-4 md:p-5 mb-6">
                                <div className="flex items-start gap-3">
                                    <MessageCircleQuestion className="w-5 h-5 text-[#0071BC] mt-0.5" />
                                    <div>
                                        <h2 className="text-base md:text-lg font-bold text-gray-800 mb-1">Need more help?</h2>
                                        <p className="text-gray-700 text-sm md:text-base">
                                            If your question is not listed here, use one of the quick options below.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                    <Link
                                        to="/help/enroll"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#0071BC] font-semibold text-sm hover:border-[#0071BC]/30 transition-colors"
                                    >
                                        Enroll as Student
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        to="/support"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#0071BC] font-semibold text-sm hover:border-[#0071BC]/30 transition-colors"
                                    >
                                        Go to Support Page
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        to="/"
                                        state={{ scrollTo: 'contact' }}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-[#0071BC] font-semibold text-sm hover:border-[#0071BC]/30 transition-colors"
                                    >
                                        Contact EFIC
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </ScrollReveal>

                            <div className="space-y-4">
                                {faqs.map((item, index) => (
                                    <ScrollReveal key={item.q} delay={0.04 * (index + 1)}>
                                        <article className="rounded-xl border border-gray-100 bg-gradient-to-r from-white to-blue-50/40 p-5">
                                            <div className="text-xs font-semibold text-[#0071BC] uppercase tracking-wide mb-1">Question {index + 1}</div>
                                            <h2 className="text-lg font-bold text-gray-800 mb-2">{item.q}</h2>
                                            <p className="text-gray-700 text-sm md:text-base leading-relaxed">{item.a}</p>
                                        </article>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </section>
                    </ScrollReveal>
                </PageContainer>
            </main>

            <Footer />
        </div>
    );
};

export default HelpQA;
