type TClertLayoutProp = {
    children: React.ReactNode;
};

export default function ClerkLayout({ children }: TClertLayoutProp) {
    return (
        <div className="flex h-full items-center justify-center">
            {children}
        </div>
    );
}
