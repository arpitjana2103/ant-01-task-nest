"use client";

import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";

export const Info = function Info() {
    const { organization: activeOrg, isLoaded: isOrgLoaded } = useOrganization();
    const { organizationId } = useParams();
    const isSwitching = activeOrg?.id !== organizationId;

    if (!isOrgLoaded || isSwitching) {
        return <Info.Skeleton />;
    }

    return (
        <div className="flex items-center gap-x-4">
            <div className="relative h-15 w-15">
                <Image
                    fill
                    src={activeOrg?.imageUrl || "https://picsum.photos/60/60"}
                    alt="ActiveOrg"
                    className="rounded-md object-cover"
                />
            </div>
            <div className="space-y-1">
                <p className="text-xl font-semibold">{activeOrg?.name}</p>
                <div className="text-muted-foreground flex items-center text-xs">
                    <CreditCard className="mr-1 h-3 w-3" />
                    Free
                </div>
            </div>
        </div>
    );
};

Info.Skeleton = function SkeletonInfo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="relative h-15 w-15">
                <Skeleton className="absolute h-full w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-10 w-50" />
                <div className="flex items-center">
                    <Skeleton className="mr-2 h-4 w-4" />
                    <Skeleton className="h-4 w-25" />
                </div>
            </div>
        </div>
    );
};
