"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { SidebarNavItem } from "./sidebar-nav-item";

// import SidebarNavItem from "./sidebar-nav-item";

type TSidebarProps = {
    storageKey?: string;
};

export default function SideBar({ storageKey = "t-sidebar-state" }: TSidebarProps) {
    const [expanded, setExpanded] = useLocalStorage<Record<string, boolean>>(storageKey, {});

    const { organization: activeOrg, isLoaded: isOrgLoaded } = useOrganization();
    const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
        userMemberships: { infinite: true },
    });

    console.log("Active ORG ", activeOrg);
    // org_3H2hn04XperEWkARzCzgWU6F5G8

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce(function (
        acc: string[],
        key: string,
    ) {
        if (expanded[key]) {
            acc.push(key);
        }
        return acc;
    }, []);

    const onExpand = function (id: string) {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    if (!isOrgLoaded || !isLoadedOrgList || userMemberships.isLoading) {
        return (
            <>
                <div className="mb-2 flex items-center justify-between">
                    <Skeleton className="h-10 w-[50%]" />
                    <Skeleton className="h-10 w-10" />
                </div>
                <div className="space-y-2">
                    <SidebarNavItem.Skeleton />
                    <SidebarNavItem.Skeleton />
                    <SidebarNavItem.Skeleton />
                </div>
            </>
        );
    }

    console.log("userMemberships.Data", userMemberships.data);

    return (
        <>
            <div className="mb-1 flex items-center text-sm font-medium">
                <span className="pl-4">Workspaces</span>
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    render={<Link href="/select-org" />}
                    className={"ml-auto"}
                    nativeButton={false}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <Accordion multiple defaultValue={defaultAccordionValue} className="space-y-2">
                {userMemberships.data.map(function (orgMembership) {
                    const organization = orgMembership.organization;
                    return (
                        <SidebarNavItem
                            key={organization.id}
                            organization={organization}
                            onExpand={onExpand}
                            isActive={organization.id === activeOrg?.id}
                            isExpanded={expanded[organization.id]}
                        />
                    );
                })}
            </Accordion>
        </>
    );
}
