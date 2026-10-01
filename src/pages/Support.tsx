import { useMemo, useRef, useState, useEffect } from 'react';
import { CheckCircle2, Copy, Landmark, ShieldCheck } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PageContainer from '@/components/layout/PageContainer';
import Button from '@/components/ui/Button';
import SEO from '@/components/SEO';
import ScrollReveal from '@/components/ScrollReveal';

type Currency = 'LKR' | 'USD';

interface DonationErrors {
    amount?: string;
}

const payHereEndpoint = 'https://sandbox.payhere.lk/pay/checkout';
const supportVideoUrl = 'https://www.youtube-nocookie.com/embed/ScMzIvxBSi4?rel=0';

const bankDetails = [
    { label: 'Bank', value: 'Amana Bank' },
    { label: 'Branch', value: 'Kalmunai' },
    { label: 'Account Name', value: 'EFFULGENT FORUM OF INDEPENDENT COMMITTEE' },
    { label: 'Account Number', value: '0010545255001' }
];

const projectPillars = [
    {
        title: 'Building Plan',
        text: 'Permanent center for classes, mentoring, and structured student development.',
        tone: 'text-[#0071BC]'
    },
    {
        title: 'Funding Need',
        text: 'Donations support infrastructure, learning resources, and essential operations.',
        tone: 'text-[#39B54A]'
    },
    {
        title: 'Student Impact',
        text: 'Better facilities improve attendance, outcomes, and pathways to higher education.',
        tone: 'text-[#ED1C24]'
    },
    {
        title: 'Community Benefit',
        text: 'A stronger education hub empowers families and supports long-term local progress.',
        tone: 'text-[#0071BC]'
    }
];

const LazyVideoEmbed = () => {
    const [shouldLoad, setShouldLoad] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shouldLoad || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '200px 0px' }
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [shouldLoad]);

    return (
        <div ref={containerRef} className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
            <div className="aspect-video w-full">
                {shouldLoad ? (
                    <iframe
                        title="Support EFIC"
                        src={supportVideoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0071BC]/10 to-[#39B54A]/10 flex items-center justify-center p-6">
                        <p className="text-gray-700 font-semibold text-center">Loading support video...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Support = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState<Currency>('LKR');
    const [errors, setErrors] = useState<DonationErrors>({});
    const [copiedKey, setCopiedKey] = useState('');

    const amountInputRef = useRef<HTMLInputElement>(null);
    const donationSectionRef = useRef<HTMLElement>(null);

    const orderId = useMemo(() => `EFIC-${Date.now()}`, []);
    const returnUrl = useMemo(() => `${window.location.origin}/support/success`, []);
    const cancelUrl = useMemo(() => `${window.location.origin}/support/cancel`, []);

    const validateDonation = () => {
        const nextErrors: DonationErrors = {};

        if (!amount.trim()) {
            nextErrors.amount = 'Donation amount is required.';
        } else if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
            nextErrors.amount = 'Enter a valid number (up to 2 decimals).';
        } else if (Number(amount) <= 0) {
            nextErrors.amount = 'Amount must be greater than zero.';
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleAmountChange = (value: string) => {
        if (value === '' || /^\d*(\.\d{0,2})?$/.test(value)) {
            setAmount(value);
            if (errors.amount) {
                setErrors({});
            }
        }
    };

    const copyToClipboard = async (label: string, value: string) => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(value);
            } else {
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = value;
                tempTextArea.style.position = 'fixed';
                tempTextArea.style.left = '-9999px';
                tempTextArea.style.top = '0';
                document.body.appendChild(tempTextArea);
                tempTextArea.focus();
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
            }
            setCopiedKey(label);
            window.setTimeout(() => setCopiedKey(''), 2200);
        } catch {
            setCopiedKey('');
        }
    };

    const handleScrollToDonate = () => {
        donationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => amountInputRef.current?.focus(), 350);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/50 to-white text-gray-900 font-sans overflow-hidden relative">
            <SEO
                title="Support EFIC - Build the Future of Education"
                description="Support EFIC's permanent building project and student development through secure PayHere donations."
                path="/support"
                keywords={[
                    'Support EFIC',
                    'EFIC donation',
                    'education charity Sri Lanka',
                    'build school support',
                    'PayHere donation'
                ]}
            />

            <Header />

            <main className="pt-24 md:pt-28 pb-16 md:pb-20">
                <PageContainer className="space-y-10 md:space-y-14 animate-fade-in">
                    <ScrollReveal>
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center pt-2 md:pt-4">
                            <LazyVideoEmbed />

                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0071BC]/10 to-[#39B54A]/10 rounded-full mb-5 border border-[#0071BC]/15">
                                    <ShieldCheck className="w-4 h-4 text-[#39B54A]" />
                                    <span className="text-sm font-medium text-[#0071BC]">Secure Giving via</span>
                                    <span className="text-sm font-black leading-none">
                                        <span className="text-[#0071BC]">Pay</span>
                                        <span className="text-[#39B54A]">Here</span>
                                    </span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-5">
                                    <span className="bg-gradient-to-r from-[#0071BC] via-[#39B54A] to-[#ED1C24] bg-clip-text text-transparent">
                                        Support EFIC
                                    </span>
                                    <br />
                                    <span className="text-gray-800">Build the Future of Education</span>
                                </h1>
                                <p className="text-gray-600 mb-7 text-base md:text-lg max-w-2xl">
                                    Your support helps us provide free education, complete our permanent building project, and continue
                                    empowering students with safe, long-term learning opportunities.
                                </p>
                                <Button onClick={handleScrollToDonate}>Donate Now</Button>
                            </div>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.06}>
                        <section className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-gray-100 bg-white shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0071BC]/5 via-[#39B54A]/5 to-[#ED1C24]/5" />
                            <div className="relative p-6 md:p-8 lg:p-10">
                                <div className="max-w-3xl mb-8 md:mb-10">
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                                        Project <span className="text-[#0071BC]">Details</span>
                                    </h2>
                                    <p className="text-gray-600 text-base md:text-lg">
                                        We are creating a permanent learning campus for free education with stronger facilities, safer spaces,
                                        and measurable impact for students and the Kalmunai community.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                                    <div className="rounded-2xl border border-[#0071BC]/15 bg-white/90 p-5 md:p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Why This Project Matters</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[#0071BC]" />
                                                <p className="text-gray-700">
                                                    Build dedicated classrooms, science-friendly learning areas, and student support spaces.
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[#39B54A]" />
                                                <p className="text-gray-700">
                                                    Reduce dependency on temporary facilities and create stability for future generations.
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[#ED1C24]" />
                                                <p className="text-gray-700">
                                                    Increase student confidence, retention, and pathways to higher education.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {projectPillars.map((pillar) => (
                                            <article key={pillar.title} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                                                <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${pillar.tone}`}>{pillar.title}</p>
                                                <p className="text-gray-700 text-sm md:text-base">{pillar.text}</p>
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <section
                            id="donation-form"
                            ref={donationSectionRef}
                            className="bg-gradient-to-br from-[#0071BC]/5 to-[#39B54A]/5 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100"
                        >
                            <div className="flex items-center gap-2 mb-6">
                                <Landmark className="w-5 h-5 text-[#0071BC]" />
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    Bank Details <span className="text-[#39B54A]">& Donation</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
                                <div className="rounded-xl md:rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 md:p-6 shadow-sm space-y-3">
                                    {bankDetails.map((detail) => (
                                        <div
                                            key={detail.label}
                                            className="rounded-lg border border-gray-100 bg-gradient-to-r from-white to-blue-50/30 p-3 sm:p-4"
                                        >
                                            <div className="grid grid-cols-[1fr_auto] items-start gap-3">
                                                <div className="min-w-0 pr-1">
                                                    <p className="text-xs sm:text-sm text-gray-500">{detail.label}</p>
                                                    <p className="text-sm sm:text-base font-semibold text-gray-800 break-all">{detail.value}</p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => copyToClipboard(detail.label, detail.value)}
                                                    className={`icon-btn-fixed inline-flex items-center justify-center h-8 w-8 rounded-md border transition-colors place-self-start ${copiedKey === detail.label
                                                        ? 'border-[#39B54A]/35 text-[#39B54A] bg-[#39B54A]/10'
                                                        : 'border-[#0071BC]/25 text-[#0071BC] hover:bg-[#0071BC]/5'
                                                        }`}
                                                    aria-label={copiedKey === detail.label ? `${detail.label} copied` : `Copy ${detail.label}`}
                                                >
                                                    {copiedKey === detail.label ? (
                                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <form
                                    action={payHereEndpoint}
                                    method="POST"
                                    onSubmit={(event) => {
                                        if (!validateDonation()) {
                                            event.preventDefault();
                                        }
                                    }}
                                    className="space-y-5 rounded-xl border border-gray-100 bg-white p-5 md:p-6"
                                >
                                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 flex-wrap">
                                        <ShieldCheck className="w-5 h-5 text-[#39B54A]" />
                                        <span>Donate via</span>
                                        <span className="text-base sm:text-lg font-black leading-none">
                                            <span className="text-[#0071BC]">Pay</span>
                                            <span className="text-[#39B54A]">Here</span>
                                        </span>
                                    </h3>

                                    <div>
                                        <label htmlFor="donation-amount" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Donation Amount
                                        </label>
                                        <div className="flex items-stretch w-full rounded-lg md:rounded-xl border border-gray-300 bg-white overflow-hidden focus-within:border-[#0071BC] focus-within:ring-2 focus-within:ring-[#0071BC]/20 transition-all">
                                            <select
                                                id="currency"
                                                name="currency"
                                                aria-label="Donation currency"
                                                title="Donation currency"
                                                value={currency}
                                                onChange={(event) => setCurrency(event.target.value as Currency)}
                                                className="w-24 sm:w-28 px-3 py-3 text-sm sm:text-base font-semibold text-gray-700 bg-gradient-to-r from-gray-50 to-white border-r border-gray-200 focus:outline-none"
                                            >
                                                <option value="LKR">LKR</option>
                                                <option value="USD">USD</option>
                                            </select>
                                            <input
                                                id="donation-amount"
                                                ref={amountInputRef}
                                                type="text"
                                                inputMode="decimal"
                                                name="amount"
                                                value={amount}
                                                onChange={(event) => handleAmountChange(event.target.value)}
                                                placeholder="0.00"
                                                className="flex-1 min-w-0 px-4 py-3 text-base bg-transparent focus:outline-none"
                                                aria-describedby={errors.amount ? 'donation-amount-error' : undefined}
                                                required
                                            />
                                        </div>
                                        {errors.amount && (
                                            <p id="donation-amount-error" className="mt-2 text-sm text-red-600">
                                                {errors.amount}
                                            </p>
                                        )}
                                    </div>

                                    <input type="hidden" name="merchant_id" value="YOUR_MERCHANT_ID" />
                                    <input type="hidden" name="return_url" value={returnUrl} />
                                    <input type="hidden" name="cancel_url" value={cancelUrl} />
                                    <input type="hidden" name="order_id" value={orderId} />
                                    <input type="hidden" name="items" value="EFIC Donation" />

                                    <div className="pt-1">
                                        <Button type="submit">Donate Now</Button>
                                    </div>

                                    <p className="text-xs text-gray-600">
                                        Payment is redirected to PayHere for secure processing. This site does not process or store card data.
                                    </p>
                                </form>
                            </div>
                        </section>
                    </ScrollReveal>
                </PageContainer>
            </main>

            <Footer />
        </div>
    );
};

export default Support;
