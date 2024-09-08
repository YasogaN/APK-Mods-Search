'use server'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { query, pagenum, cse_tok } = await req.json();
    const page = pagenum * 10;
    const response = await fetch(`https://corsproxy.io/?https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=10&hl=en&start=${page}&cx=752437097efb4468f&q=${query}&safe=off&cse_tok=${cse_tok}&callback=google.search.cse.api19695`);
    const data = await response.text();
    const cleaned = await data
        .replace("/*O_o*/", "")
        .replace("google.search.cse.api19695(", "")
        .replace(/\);$/, "");
    const json = JSON.parse(cleaned);
    const results = json.results.map((result: any) => {
        return {
            site: result.visibleUrl,
            title: result.titleNoFormatting,
            description: result.contentNoFormatting,
            link: result.unescapedUrl,
            imageUrl: result.richSnippet?.cseThumbnail?.src ?? '',
        };
    });
    return NextResponse.json(results, { status: 200 });
}