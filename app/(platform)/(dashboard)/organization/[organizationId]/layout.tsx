import OrgControl from "./_components/org-control";

type TOrganizationLayoutProps = {
    children: React.ReactNode;
};

export default function OrganizationLayout({
    children,
}: TOrganizationLayoutProps) {
    return (
        <>
            <OrgControl />
            {children}
        </>
    );
}
