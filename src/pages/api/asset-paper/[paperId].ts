import { NextRequest, NextResponse } from "next/server";

import {
  CONTENTFUL_DELIVERY_TOKEN,
  CONTENTFUL_SPACE_ID,
} from "@/lib/environments";

export const config = {
  runtime: "edge",
};

// serverless functionはレスポンスのペイロードが上限が4MBなので、上限がより多いedge functionを使う

const handler = async (req: NextRequest) => {
  const url = new URL(req.nextUrl);
  const paperId = url.searchParams.get("paperId");

  if (!paperId) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  //paperモデルをfetch
  const paperApiUrl = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${paperId}?access_token=${CONTENTFUL_DELIVERY_TOKEN}`;
  const paperApiRes = await fetch(paperApiUrl);

  if (!paperApiRes.ok) {
    return NextResponse.json(
      { message: "asset not found" },
      { status: 400 }
    );
  }

  const paperApiResJson = await paperApiRes.json();
  const assetId = paperApiResJson.fields.pdf.sys.id;

  //paperのpdfフィールドに紐付くassetをfetch
  const assetApiUrl = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/assets/${assetId}?access_token=${CONTENTFUL_DELIVERY_TOKEN}`;
  const assetApiRes = await fetch(assetApiUrl);

  if (!assetApiRes.ok) {
    return NextResponse.json({ message: "asset not found" }, { status: 400 });
  }

  const assetApiResJson = await assetApiRes.json();
  const assetUrl = assetApiResJson.fields.file?.url;

  const assetType = assetApiResJson.fields.file?.contentType;

  if (!assetUrl) {
    return NextResponse.json({ message: "asset not found" }, { status: 400 });
  }

  const asset = await fetch(`https:${assetUrl}`);

  return new NextResponse(asset.body, {
    status: 200,
    headers: {
      "Cache-Control": "s-maxage=604800",
      "Content-type": assetType,
    },
  });
};

export default handler;
