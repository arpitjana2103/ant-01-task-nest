import { auth } from "@clerk/nextjs/server";
import { HelpCircle, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FormPopover } from "@/components/form/form-popover";
import Hint from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";

export default async function BoardList({
    activeOrgId,
}: {
    activeOrgId: string | null | undefined;
}) {
    if (!activeOrgId) {
        return redirect("/select-org");
    }

    const boards = await prisma.board.findMany({
        where: {
            orgId: activeOrgId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center text-lg font-semibold text-neutral-700">
                <User2 className="mr-2 h-6 w-6" />
                Your Boards
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {boards.map(function (board) {
                    return (
                        <Link
                            key={board.id}
                            href={`/board/${board.id}`}
                            style={{ backgroundImage: `url(${board.imageThumbnail})` }}
                            className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
                        >
                            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
                            <p className="relative font-semibold text-white">{board.title}</p>
                        </Link>
                    );
                })}

                <FormPopover sideOffset={10} side={"right"}>
                    <div
                        role="button"
                        className="bg-muted relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm transition hover:opacity-75"
                    >
                        <p className="text-sm">Create New Board</p>
                        <span className="text-xs">5 remaining</span>
                        <Hint
                            className=""
                            sideOffset={30}
                            description="Free Workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace"
                        >
                            <HelpCircle className="absolute right-2 bottom-2 h-3.5 w-3.5" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    );
}

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="gird-cols-2 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
    );
};
