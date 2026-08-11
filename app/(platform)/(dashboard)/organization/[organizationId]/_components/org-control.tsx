"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function OrgControl() {
    const { organizationId } = useParams();
    const { setActive } = useOrganizationList();

    useEffect(
        function () {
            async function func() {
                if (!organizationId || !setActive) return;
                await setActive({ organization: organizationId as string });
            }
            void func();
        },
        [organizationId, setActive],
    );

    return null;
}
