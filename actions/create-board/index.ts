"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import prisma from "@/lib/prisma";

import { CreateBoardSchema } from "./schema";
import type { InputType, ReturnType } from "./types";

const handler = async function (data: InputType): Promise<ReturnType> {
    await auth.protect();
    const { userId } = await auth();

    if (!userId) {
        return {
            error: "Unauthorized",
        };
    }

    const { title } = data;

    try {
        const newBoard = await prisma.board.create({
            data: { title },
        });
        revalidatePath(`/boards/${newBoard.id}`);
        return {
            data: newBoard,
        };
    } catch (_error) {
        return {
            error: "Failed to create board",
        };
    }
};

export const createBoardAction = createSafeAction(CreateBoardSchema, handler);
