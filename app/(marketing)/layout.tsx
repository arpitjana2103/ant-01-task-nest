import Footer from "./_components/footer";
import NavBar from "./_components/navbar";

type TMarketingLayoutProps = {
    children: React.ReactNode;
};

export default function MarketingLayout({ children }: TMarketingLayoutProps) {
    return (
        <div className="h-full bg-slate-100">
            <NavBar />
            <main className="bg-slate-100 pt-40 pb-20">{children}</main>
            <Footer />
        </div>
    );
}
