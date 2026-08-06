import { z } from "zod";

export type TErrorNode<T> = {
    errors: string[];
    properties?: {
        [K in keyof T]?: TErrorNode<T[K]>;
    };
};

export type TActionState<TInput, TOutput> = {
    validationErrors?: TErrorNode<TInput>;
    error?: string | null;
    data?: TOutput;
};

export function createSafeAction<TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: (validatedData: TInput) => Promise<TActionState<TInput, TOutput>>,
) {
    return async function safeAction(data: TInput): Promise<TActionState<TInput, TOutput>> {
        const validateionResult = schema.safeParse(data);

        if (!validateionResult.success) {
            return {
                validationErrors: z.treeifyError(validateionResult.error) as TErrorNode<TInput>,
            };
        }

        return handler(validateionResult.data);
    };
}

// ----------------------------- Example
/*
    const createTodoSchema = z.object({
        title: z.string().min(3),
        completed: z.boolean(),
    });

    type CreateTodoInput = z.infer<typeof createTodoSchema>;

    async function createTodoHandler(
        data: CreateTodoInput,
    ): Promise<ActionState<CreateTodoInput, CreateTodoOutput>> {
        try {

            const todo = await db.todo.create({
                data,
            });

            return {
                data: todo,
        };
        } catch (error) {
            return {
                error: error instanceof Error ? error.message : String(error),
            };
        }
    }

    export const createTodoAction = createSafeAction(createTodoSchema, createTodo);
*/
