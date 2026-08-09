import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/toast";

type TPlatformLayoutProps = {
    children: React.ReactNode;
};

export default function PlatformLayout({ children }: TPlatformLayoutProps) {
    return (
        <ClerkProvider afterSignOutUrl="/">
            {children} <Toaster />
        </ClerkProvider>
    );
}
