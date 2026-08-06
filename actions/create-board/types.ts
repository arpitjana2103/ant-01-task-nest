import type { z } from "zod";

import type { Board as TBoard } from "@/generated/prisma/client";
import type { TActionState } from "@/lib/create-safe-action";

import type { CreateBoardSchema } from "./schema";

export type InputType = z.infer<typeof CreateBoardSchema>;
export type ReturnType = TActionState<InputType, TBoard>;
