import { ClerkProvider } from "@clerk/nextjs";

type TPlatformLayoutProps = {
    children: React.ReactNode;
};

export default function PlatformLayout({ children }: TPlatformLayoutProps) {
    return <ClerkProvider afterSignOutUrl="/">{children}</ClerkProvider>;
}
