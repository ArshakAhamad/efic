import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
}

const Button = ({ children, variant = 'primary', className = '', ...props }: ButtonProps) => {
    const baseClasses =
        'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl md:rounded-2xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed';

    const variantClasses =
        variant === 'primary'
            ? 'bg-gradient-to-r from-[#0071BC] to-[#39B54A] text-white'
            : 'bg-white text-[#0071BC] border-2 border-[#0071BC]/20 hover:border-[#0071BC]';

    return (
        <button type="button" className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;