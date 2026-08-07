"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { FormErrors } from "./form-errors";

type TFormInputProps = {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    validationErrors?: string[];
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
};

const FormInputComponent = function (
    props: TFormInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
) {
    const {
        id,
        label,
        type,
        placeholder,
        required,
        disabled,
        validationErrors,
        className,
        defaultValue,
        onBlur,
    } = props;

    const { pending } = useFormStatus();

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                {label ? (
                    <Label htmlFor={id} className="text-xs font-semibold text-neutral-700">
                        {label}
                    </Label>
                ) : null}
                <Input
                    onBlur={onBlur}
                    defaultValue={defaultValue}
                    ref={ref}
                    required={required}
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    disabled={pending || disabled}
                    className={cn("text-sm px-2 py-1 h-7", className)}
                    aria-describedby={`${id}-error`}
                />
            </div>
            <FormErrors id={id} errors={validationErrors} />
        </div>
    );
};

export const FormInput = forwardRef(FormInputComponent);
FormInput.displayName = "FormInput";
