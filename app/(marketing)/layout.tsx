type TMarketingLayoutProps = {
    children: React.ReactNode;
};

export default function MarketingLayout({ children }: TMarketingLayoutProps) {
    return (
        <div className="h-full bg-slate-100">
            <main className="bg-slate-100 pt-40 pb-20">{children}</main>
        </div>
    );
}
