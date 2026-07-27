import OrgControl from "./_components/org-control";

type TOrganizationLayoutProps = {
    children: React.ReactNode;
};

export default function OrganizationIdLayout({ children }: TOrganizationLayoutProps) {
    return (
        <>
            <OrgControl />
            {children}
        </>
    );
}
