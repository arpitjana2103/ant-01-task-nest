import { clerkClient } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import OrgControl from "./_components/org-control";

type TOrganizationLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ organizationId: string }>;
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ organizationId: string }>;
}): Promise<Metadata> {
    const { organizationId } = await params;
    const client = await clerkClient();

    try {
        const organization = await client.organizations.getOrganization({
            organizationId,
        });

        return {
            title: organization.name,
        };
    } catch {
        return {
            title: "Organzation",
        };
    }
}

export default async function OrganizationIdLayout({ children }: TOrganizationLayoutProps) {
    return (
        <>
            <OrgControl />
            {children}
        </>
    );
}
