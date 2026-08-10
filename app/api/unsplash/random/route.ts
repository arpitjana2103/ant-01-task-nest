import { NextResponse } from "next/server";

import { unsplash } from "@/lib/unsplash";

export async function GET() {
    const result = await unsplash.GET("/photos/random", {
        params: {
            query: {
                collections: ["317099"],
                count: 9,
            },
        },
    });

    if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result.data);
}
