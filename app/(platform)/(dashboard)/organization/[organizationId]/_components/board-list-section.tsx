"use client";

import { useOrganization } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function BoardListSection({
    children,
    fallback,
    activeOrgId,
}: {
    children: React.ReactNode;
    fallback: React.ReactNode;
    activeOrgId: string | null | undefined;
}) {
    const { organizationId: currOrgId } = useParams();

    const isSwitching = activeOrgId !== currOrgId;

    if (isSwitching) {
        return fallback;
    }

    return <Suspense fallback={fallback}>{children}</Suspense>;
}
