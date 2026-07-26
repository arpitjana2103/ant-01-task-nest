type TOrganizationLayoutProps = {
    children: React.ReactNode;
};

export default function OrganizationLayout({
    children,
}: TOrganizationLayoutProps) {
    return (
        <div className="mt:pt-24 mx-auto max-w-6xl px-4 pt-20 2xl:max-w-7xl">
            <div className="flex gap-x-7">
                <div className="hidden w-64 shrink-0 md:block">
                    {/*Sidebar*/}
                </div>

                {children}
            </div>
        </div>
    );
}
