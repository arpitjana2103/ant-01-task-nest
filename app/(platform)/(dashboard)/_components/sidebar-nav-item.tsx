import type { OrganizationResource } from "@clerk/nextjs/types";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

type TSidebarNavItemProps = {
    organization: OrganizationResource;
    isActive: boolean;
    isExpanded: boolean;
};
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const SidebarNavItem = function ({
    organization,
    isActive,
    isExpanded,
}: TSidebarNavItemProps) {
    const nextRouter = useRouter();
    const pathname = usePathname();
    const routes = [
        {
            label: "Boards",
            icon: <Layout className="mr-2 h-4 w-4" />,
            href: `/organization/${organization.id}`,
        },
        {
            label: "Activity",
            icon: <Activity className="mr-2 h-4 w-4" />,
            href: `/organization/${organization.id}/activity`,
        },
        {
            label: "Settings",
            icon: <Settings className="mr-2 h-4 w-4" />,
            href: `/organization/${organization.id}/settings`,
        },
        {
            label: "Billing",
            icon: <CreditCard className="mr-2 h-4 w-4" />,
            href: `/organization/${organization.id}/billing`,
        },
    ];

    return (
        <AccordionItem value={organization.id} className="border-none">
            <AccordionTrigger
                className={cn(
                    "flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
                    isActive && !isExpanded && "bg-sky-500/10 text-sky-700",
                )}
            >
                {" "}
                <div className="flex items-center gap-x-2">
                    <div className="relative h-7 w-7">
                        <Image
                            fill
                            sizes="107px"
                            src={organization.imageUrl}
                            alt="Organization"
                            className="rounded-sm object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium">{organization.name}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map(function (route) {
                    return (
                        <Button
                            key={route.href}
                            size={"sm"}
                            onClick={() => nextRouter.push(route.href)}
                            className={cn(
                                "w-full font-normal justify-start pl-10 py-4",
                                pathname === route.href && "bg-sky-500/10 text-sky-700",
                            )}
                            variant="ghost"
                        >
                            {route.icon}
                            {route.label}
                        </Button>
                    );
                })}
            </AccordionContent>
        </AccordionItem>
    );
};

SidebarNavItem.Skeleton = function SkeletonNavItem() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="relative h-10 w-10 shrink-0">
                <Skeleton className="absolute h-full w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
};
