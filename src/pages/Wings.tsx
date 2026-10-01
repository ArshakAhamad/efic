import { Sparkles, ExternalLink, ShieldCheck, Laptop, Smartphone, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import SEO, { StructuredData } from '@/components/SEO';
import { seoConfig } from '@/data/seoConfig';
import ScrollReveal from '@/components/ScrollReveal';

const INSTALL_SECTION_ID = 'efic-wings-launch';
const WINGS_APP_URL = 'https://wings.efic.lk';

const getDeviceType = (): 'ios' | 'android' | 'desktop' => {
    if (typeof navigator === 'undefined') return 'desktop';
    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && typeof window !== 'undefined' && !(window as any).MSStream;
    if (isIOS) return 'ios';
    if (/Android/.test(ua)) return 'android';
    return 'desktop';
};

type GuideId = 'desktop' | 'android' | 'ios';

interface InstallGuide {
    id: GuideId;
    title: string;
    subtitle: string;
    steps: string[];
    Icon: LucideIcon;
}

const installGuides: InstallGuide[] = [
    {
        id: 'desktop',
        title: 'Windows & macOS',
        subtitle: 'Microsoft Edge / Google Chrome',
        Icon: Laptop,
        steps: ['Open wings.efic.lk in Edge or Chrome.', 'Sign in with your Wings account.', 'Install using the browser install icon if you want app-like launching.']
    },
    {
        id: 'android',
        title: 'Android',
        subtitle: 'Chrome or Samsung Internet',
        Icon: Smartphone,
        steps: ['Open wings.efic.lk in Chrome or Samsung Internet.', 'Sign in with your Wings account.', 'Use Add to Home screen for one-tap launch.']
    },
    {
        id: 'ios',
        title: 'iPhone & iPad',
        subtitle: 'Safari',
        Icon: Smartphone,
        steps: ['Open wings.efic.lk in Safari.', 'Sign in with your Wings account.', 'Tap Share and choose Add to Home Screen for native-style access.']
    }
];

const featureCards = [
    {
        title: 'Dedicated platform',
        description: 'Wings now runs on its own domain for cleaner operations and faster releases.',
        Icon: Rocket
    },
    {
        title: 'Smooth access',
        description: 'Use the secure Wings sign-in flow directly on wings.efic.lk.',
        Icon: ExternalLink
    },
    {
        title: 'Hardened security',
        description: 'Authentication and APIs stay isolated from this public website.',
        Icon: ShieldCheck
    }
];

const deviceLabelMap: Record<'ios' | 'android' | 'desktop', string> = {
    ios: 'iPhone / iPad',
    android: 'Android',
    desktop: 'Windows & macOS'
};

const Wings = () => {
    const wingsKeywords = [
        'EFIC Wings',
        'wings.efic.lk',
        'EFIC student portal',
        'EFIC staff portal',
        'education platform Sri Lanka'
    ];

    const wingsUrl = WINGS_APP_URL;

    const wingsStructuredData: StructuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        '@id': `${wingsUrl}#app`,
        name: 'EFIC Wings',
        url: wingsUrl,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Android, iOS, Windows, macOS',
        browserRequirements: 'Requires a modern browser with PWA support',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'LKR'
        },
        creator: {
            '@id': `${seoConfig.siteUrl}#organization`
        },
        featureList: [
            'Unified student, staff, parent, and member dashboards',
            'Offline-friendly progressive web app',
            'Secure token-based authentication'
        ]
    };

    const seoNode = (
        <SEO
            title="EFIC Wings - Moved to wings.efic.lk"
            description="EFIC Wings now runs on its own URL. Open wings.efic.lk for student, staff, and admin access."
            path="/wings"
            keywords={wingsKeywords}
            type="WebApplication"
            structuredData={[wingsStructuredData]}
        />
    );

    const launchWings = () => {
        window.open(WINGS_APP_URL, '_blank', 'noopener,noreferrer');
    };

    const scrollToInstall = () => {
        const section = document.getElementById(INSTALL_SECTION_ID);
        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const device = getDeviceType();
    const activeGuide = installGuides.find((guide) => guide.id === device)!;

    return (
        <>
            {seoNode}
            <div className="min-h-screen bg-slate-950 text-white">
                <div className="max-w-6xl mx-auto px-3 lg:px-6 py-14 space-y-14">
                    <ScrollReveal>
                        <section className="bg-gradient-to-br from-[#0d1b2a] via-[#13223b] to-[#0c1829] rounded-3xl p-7 lg:p-12 shadow-2xl ring-1 ring-white/5">
                            <div className="flex flex-col gap-6 text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-sky-200 uppercase tracking-[0.3em]">
                                    <Sparkles className="w-4 h-4 text-sky-300" />
                                    EFIC Wings Platform
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                                    EFIC Wings has moved to its own dedicated URL.
                                </h1>
                                <p className="text-lg text-slate-200 max-w-3xl mx-auto lg:mx-0">
                                    For the fastest and most secure experience, open Wings directly at wings.efic.lk.
                                    This website now stays focused on public EFIC information only.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                    <button
                                        type="button"
                                        onClick={launchWings}
                                        className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-semibold hover:bg-slate-100 transition shadow-lg"
                                    >
                                        Open wings.efic.lk
                                    </button>
                                    <button
                                        type="button"
                                        onClick={scrollToInstall}
                                        className="px-6 py-3 rounded-2xl border border-white/30 font-semibold text-slate-100 hover:border-white/60 transition"
                                    >
                                        Setup on {deviceLabelMap[device]}
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                                    {featureCards.map(({ title, description, Icon }, index) => (
                                        <ScrollReveal key={title} delay={0.05 * (index + 1)}>
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-left">
                                                <Icon className="w-6 h-6 text-[#39B54A] mb-3" />
                                                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                                                <p className="text-sm text-slate-200">{description}</p>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    <ScrollReveal delay={0.08}>
                        <section id={INSTALL_SECTION_ID} className="space-y-6 px-2 lg:px-0">
                            <div>
                                <p className="text-sky-300 uppercase tracking-[0.3em] text-sm mb-2">Quick start</p>
                                <h2 className="text-3xl font-bold mb-2">Launch EFIC Wings on your device</h2>
                                <p className="text-slate-200">
                                    Access is now centralized at wings.efic.lk. You can still install it for app-like one-tap usage.
                                </p>
                            </div>

                            <div className="rounded-3xl p-6 border border-[#0071BC] shadow-lg bg-white text-slate-900">
                                <div className="flex items-center gap-3 mb-4">
                                    <activeGuide.Icon className="w-10 h-10 text-[#0071BC]" />
                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-slate-500">Recommended for you</p>
                                        <h3 className="text-xl font-semibold">{activeGuide.title}</h3>
                                        <p className="text-sm text-slate-500">{activeGuide.subtitle}</p>
                                    </div>
                                </div>
                                <ol className="space-y-3 text-sm text-slate-700">
                                    {activeGuide.steps.map((step, index) => (
                                        <li key={step} className="flex gap-3">
                                            <span className="flex-none w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center bg-[#0071BC] text-white">
                                                {index + 1}
                                            </span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ol>
                                <button
                                    type="button"
                                    onClick={launchWings}
                                    className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0071BC] to-[#39B54A] text-white font-semibold shadow-lg"
                                >
                                    Go to Wings
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </section>
                    </ScrollReveal>
                </div>
            </div>
        </>
    );
};

export default Wings;
