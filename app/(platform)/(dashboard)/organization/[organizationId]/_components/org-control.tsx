"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function OrgControl() {
    const { organizationId } = useParams();
    const { setActive } = useOrganizationList();

    useEffect(
        function () {
            if (!organizationId || !setActive) return;
            void setActive({ organization: organizationId as string });
        },
        [organizationId, setActive],
    );

    return null;
}
