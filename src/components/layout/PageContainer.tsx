import type { ReactNode } from 'react';

interface PageContainerProps {
    children: ReactNode;
    className?: string;
}

const PageContainer = ({ children, className = '' }: PageContainerProps) => {
    return <div className={`max-w-7xl mx-auto px-4 sm:px-6 ${className}`}>{children}</div>;
};

export default PageContainer;