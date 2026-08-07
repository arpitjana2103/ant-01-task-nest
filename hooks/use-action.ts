import { useState, useCallback } from "react";

import type { TActionState, TValidationError } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (data: TInput) => Promise<TActionState<TInput, TOutput>>;

type UseActionOptions<TOutput> = {
    onSuccess?: (data: TOutput) => void;
    onError?: (error: string) => void;
    onComplete?: () => void;
};

export const useAction = function <TInput, TOutput>(
    action: Action<TInput, TOutput>,
    options: UseActionOptions<TOutput> = {},
) {
    const [validationErrors, setValidationErrors] = useState<TValidationError<TInput> | undefined>(
        undefined,
    );
    const [error, setError] = useState<string | undefined>(undefined);
    const [data, setData] = useState<TOutput | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const execute = useCallback(
        async (input: TInput) => {
            setIsLoading(true);

            try {
                const result = await action(input);

                if (!result) {
                    return;
                }

                setValidationErrors(result.validationErrors);

                if (result.error) {
                    setError(result.error);
                    options.onError?.(result.error);
                }

                if (result.data) {
                    setData(result.data);
                    options.onSuccess?.(result.data);
                }
            } finally {
                setIsLoading(false);
                options.onComplete?.();
            }
        },
        [action, options],
    );

    return {
        execute,
        validationErrors,
        error,
        data,
        isLoading,
    };
};
