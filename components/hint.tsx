import { Divide } from "lucide-react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

type HintProps = {
    children: React.ReactNode;
    description: string;
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number;
    className?: string;
};

export default function Hint({
    children,
    description,
    side = "bottom",
    sideOffset = 0,
    className,
}: HintProps) {
    return (
        <div className={className}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>{children}</TooltipTrigger>
                    <TooltipContent
                        sideOffset={sideOffset}
                        side={side}
                        className={"max-w-55 text-xs wrap-break-word"}
                    >
                        {description}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
