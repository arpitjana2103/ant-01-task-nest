import { auth } from "@clerk/nextjs/server";

import NavBar from "./_components/navbar";

type TDashboardLayoutProps = {
    children: React.ReactNode;
};

export default async function DashboardLayout({
    children,
}: TDashboardLayoutProps) {
    // `auth.protect()` to redirect the user to the sign-in page if they are not signed in
    await auth.protect();
    return (
        <div className="h-full">
            <NavBar />
            {children}
        </div>
    );
}
