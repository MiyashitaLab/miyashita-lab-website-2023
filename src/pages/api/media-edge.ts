import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

const handler = async (req: NextRequest) => {
  const url = new URL(req.nextUrl);
  const assetId = url.searchParams.get("id");

  if (!assetId) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  const spaceId = process.env.CONTENTFUL_SPACE_ID!;
  const accessToken = process.env.CONTENTFUL_DELIVERY_TOKEN!;
  const assetApiUrl = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/assets/${assetId}?access_token=${accessToken}`;
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

  const response = new NextResponse(asset.body);
  response.headers.set("Cache-Control", "s-maxage=604800");
  response.headers.set("Content-type", assetType);

  return response;
};

export default handler;