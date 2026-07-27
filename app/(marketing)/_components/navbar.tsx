import Link from "next/link";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function NavBar() {
    return (
        <div className="fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
            <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
                <Logo />
                <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
                    <Button
                        size="sm"
                        variant={"outline"}
                        render={<Link href="/sign-in" />}
                        nativeButton={false}
                    >
                        Login
                    </Button>
                    <Button size="sm" render={<Link href="/sign-up" />} nativeButton={false}>
                        Get Taskify for free
                    </Button>
                </div>
            </div>
        </div>
    );
}
