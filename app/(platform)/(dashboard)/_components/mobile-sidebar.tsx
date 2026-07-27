"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

import SideBar from "./sidebar";

export default function MobileSidebar() {
    const pathname = usePathname();

    const onOpen = useMobileSidebar((state) => state.onOpen);
    const onClose = useMobileSidebar((state) => state.onClose);
    const isOpen = useMobileSidebar((state) => state.isOpen);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    return (
        <>
            <Button
                onClick={onOpen}
                className={"bock mr-2 md:hidden"}
                variant={"ghost"}
                size={"sm"}
            >
                <Menu className="h-4 w-4" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className={"p-2 pt-10"}>
                    <SideBar storageKey="t-sidebar-mobile-state" />{" "}
                </SheetContent>
            </Sheet>
        </>
    );
}
