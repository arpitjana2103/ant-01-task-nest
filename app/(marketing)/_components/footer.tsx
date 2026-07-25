import { Button } from "@/components/ui/button";

export default function Footer() {
    return (
        <div className="fixed bottom-0 flex w-full items-center border-t p-4 px-4">
            <div className="mx-auto flex w-full items-center justify-end md:max-w-screen-2xl">
                <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
                    <Button size="sm" variant={"ghost"}>
                        Privacy Policy
                    </Button>
                    <Button size="sm" variant={"ghost"}>
                        Terms of Service
                    </Button>
                </div>
            </div>
        </div>
    );
}
