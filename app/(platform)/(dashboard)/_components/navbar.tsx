"use client";

import { OrganizationSwitcher, useOrganization, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

import { FormPopover } from "@/components/form/form-popover";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import MobileSidebar from "./mobile-sidebar";

export default function NavBar() {
    const { organization: activeOrg } = useOrganization();
    const { organizationId: currOrgId } = useParams();
    const isSwitching = activeOrg?.id !== currOrgId;
    return (
        <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <FormPopover align="start" side="bottom" sideOffset={18} triggerBtn={true}>
                    <Button size="sm" className={"hidden h-auto rounded-sm px-2 py-1.5 md:block"}>
                        Create
                    </Button>
                </FormPopover>
                <FormPopover align="start" side="bottom" sideOffset={18} triggerBtn={true}>
                    <Button size="sm" className={"block rounded-sm md:hidden"}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </FormPopover>
            </div>

            <div className="ml-auto flex items-center gap-x-2">
                {isSwitching && <Skeleton className="h-7 w-30" />}
                {!isSwitching && (
                    <OrganizationSwitcher
                        hidePersonal
                        afterCreateOrganizationUrl={"/organization/:id"}
                        afterSelectOrganizationUrl={"/organization/:id"}
                        afterLeaveOrganizationUrl="/select-org"
                    />
                )}
                <UserButton />
            </div>
        </nav>
    );
}
