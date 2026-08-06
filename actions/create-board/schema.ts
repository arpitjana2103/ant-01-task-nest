import { z } from "zod";

export const CreateBoardSchema = z.object({
    title: z
        .string({
            error: function (issue) {
                if (issue.type === "string") {
                    return issue.message;
                }
                if (issue.input === undefined) {
                    return "Title is required";
                }
                return "Invalid title";
            },
        })
        .min(3, {
            message: "Title is too short",
        }),
});
