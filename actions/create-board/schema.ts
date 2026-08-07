import { z } from "zod";

export const CreateBoardSchema = z.object({
    title: z
        .string()
        .trim()
        .superRefine((value, ctx) => {
            if (value.length === 0) {
                ctx.addIssue({
                    code: "custom",
                    message: "Title is required",
                });
                return;
            }

            if (value.length < 3) {
                ctx.addIssue({
                    code: "custom",
                    message: "Title is too short",
                });
            }
        }),
});
