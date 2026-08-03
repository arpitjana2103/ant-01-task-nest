"use client";

import { OrganizationProfile, useOrganization } from "@clerk/nextjs";
import { useParams } from "next/navigation";

import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const { organization: activeOrg } = useOrganization();
    const { organizationId } = useParams();
    const isSwitching = activeOrg?.id !== organizationId;
    return (
        <div className={cn("w-full pb-20", isSwitching && "blur-xs pointer-events-none")}>
            <OrganizationProfile
                appearance={{
                    elements: {
                        cardBox: {
                            boxShadow: "none !important",
                            width: "100%",
                            border: "1px solid #e5e5e5",
                        },
                    },
                }}
            />
        </div>
    );
}
