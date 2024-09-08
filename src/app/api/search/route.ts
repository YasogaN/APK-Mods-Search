'use server'
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { query, pagenum } = await req.json();
    const page = pagenum * 10;
    const response = await fetch(`https://cse.google.com/cse/element/v1?rsz=filtered_cse&num=10&hl=en&start=${page}&cx=752437097efb4468f&q=${query}&safe=off&cse_tok=AB-tC_4fzs4hlvahzkO-q0KXytzw%3A1725744647538&callback=google.search.cse.api19695`);
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
            imageUrl: result.richSnippet.cseImage.src,
        };
    });
    return NextResponse.json(results, { status: 200 });
}