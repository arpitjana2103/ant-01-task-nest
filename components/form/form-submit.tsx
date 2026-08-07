"use client";

import { type VariantProps } from "class-variance-authority";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import type { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: VariantProps<typeof buttonVariants>["variant"];
}

export const FormSubmit = ({
    children,
    disabled,
    className,
    variant = "default",
}: FormSubmitProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending || disabled}
            type="submit"
            variant={variant}
            size="sm"
            className={cn(className)}
        >
            {children}
        </Button>
    );
};
