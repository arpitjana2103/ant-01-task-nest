import { XCircle } from "lucide-react";

import { TValidationError } from "@/lib/create-safe-action";

type TFormErrorsProps = {
    id: string;
    errors?: string[];
};

export const FormErrors = function ({ id, errors }: TFormErrorsProps) {
    if (!errors) {
        return null;
    }

    return (
        <div id={`${id}-error`} aria-live="polite" className="mt-2 text-xs text-rose-500">
            {errors?.map((error: string) => (
                <div
                    key={error}
                    className="flex items-center rounded-sm border border-rose-500 bg-rose-500/10 p-2 font-medium"
                >
                    <XCircle className="mr-2 h-4 w-4" />
                    {error}
                </div>
            ))}
        </div>
    );
};
