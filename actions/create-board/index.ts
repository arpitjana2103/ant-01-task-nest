"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-action";
import prisma from "@/lib/prisma";

import { CreateBoardSchema } from "./schema";
import type { InputType, ReturnType } from "./types";

const handler = async function (data: InputType): Promise<ReturnType> {
    await auth.protect();
    const { userId, orgId } = await auth();

    if (!userId) {
        return {
            error: "Unauthorized",
        };
    }

    if (!orgId) {
        return {
            error: "No organization selected for the User",
        };
    }

    const { title, image } = data;

    const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] = image.split("|");

    if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: "ImageFields missing. Failed to create board.",
        };
    }

    try {
        const newBoard = await prisma.board.create({
            data: {
                orgId: orgId,
                title: title,
                imageId: imageId,
                imageThumbnail: imageThumbUrl,
                imageFullUrl: imageFullUrl,
                imageLinkHTML: imageLinkHTML,
                imageUserName: imageUserName,
            },
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
