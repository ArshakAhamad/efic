import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import ScrollReveal from '@/components/ScrollReveal';

const SupportCancel = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-white text-gray-900 font-sans">
            <SEO
                title="Donation Cancelled"
                description="Your donation was cancelled. You can try again anytime to support EFIC."
                path="/support/cancel"
            />
            <Header />

            <main className="pt-24 md:pt-28 pb-16 md:pb-20">
                <PageContainer>
                    <ScrollReveal className="max-w-3xl mx-auto">
                        <section className="bg-white rounded-2xl md:rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100 text-center">
                            <XCircle className="w-14 h-14 mx-auto text-[#ED1C24] mb-4" />
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Donation Cancelled</h1>
                            <p className="text-gray-600 mb-8">
                                No payment was completed. If this was accidental, you can return and donate when you are ready.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link to="/support">
                                    <Button>Return to Donation Form</Button>
                                </Link>
                                <Link to="/">
                                    <Button variant="secondary">Go to Home</Button>
                                </Link>
                            </div>
                        </section>
                    </ScrollReveal>
                </PageContainer>
            </main>

            <Footer />
        </div>
    );
};

export default SupportCancel;