"use client";

import { X } from "lucide-react";
import type { ReactElement } from "react";

import { createBoardAction } from "@/actions/create-board";
import { useAction } from "@/hooks/use-action";

import { Button } from "../ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "../ui/toast";
import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";

type TFormPopoverProps = {
    children: ReactElement;
    side?: "left" | "right" | "top" | "bottom";
    align?: "start" | "center" | "end";
    sideOffset?: number;
};
export const FormPopover = function ({
    children,
    side = "bottom",
    align,
    sideOffset = 0,
}: TFormPopoverProps) {
    const { execute, validationErrors } = useAction(createBoardAction, {
        onSuccess: function (data) {
            console.log({ data });
            toast.add({
                type: "success",
                description: "Board created !",
            });
        },
        onError: function (error) {
            console.log({ error });
            toast.add({
                type: "error",
                description: error,
            });
        },
    });

    const onSubmit = async function (formData: FormData) {
        const title = formData.get("title") as string;
        await execute({ title });
    };

    return (
        <Popover>
            <PopoverTrigger render={children} nativeButton={false} />
            <PopoverContent
                align={align}
                className={"w-80 pt-3"}
                side={side}
                sideOffset={sideOffset}
            >
                <div className="pb-4 text-center text-sm font-medium text-neutral-600">
                    Create Board
                </div>
                <PopoverClose
                    className={"absolute top-2 right-2 h-auto w-auto p-2 text-neutral-600"}
                    render={<Button variant="ghost" />}
                >
                    <X className="h-4 w-4" />
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            validationErrors={validationErrors?.properties?.title?.errors}
                        />
                    </div>
                    <FormSubmit className="w-full">Create</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
