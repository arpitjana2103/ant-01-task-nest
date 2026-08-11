import { auth } from "@clerk/nextjs/server";
import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";

import BoardList from "./_components/board-list";
import BoardListSection from "./_components/board-list-section";
import { Info } from "./_components/info";

export default async function OrganizationIdPage() {
    const { orgId: activeOrgId } = await auth();
    return (
        <div className="mb-20 w-full">
            <Info />
            <Separator className={"my-4"} />
            <div className="px-2 md:px-4">
                <BoardListSection activeOrgId={activeOrgId} fallback={<BoardList.Skeleton />}>
                    <BoardList activeOrgId={activeOrgId} />
                </BoardListSection>
            </div>
        </div>
    );
}
