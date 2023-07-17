import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "node:stream";

import { client } from "@/lib/cms/contentfulClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const assetId = req.query.id as string;
  const fileName = (req.query.name ?? assetId) as string;

  if (!assetId) {
    return res.status(400).json({ message: "id is required" });
  }

  const asset = await client.getAsset(assetId);
  const assetUrl = asset.fields.file?.url;

  if (!assetUrl) {
    return res.status(404).json({ message: "asset not found" });
  }

  const assetRes = await fetch(`https:${assetUrl}`);

  if (!assetRes.ok || !assetRes.body) {
    res.status(404).json({ message: "asset not found" });
    return;
  }

  //Vercelの仕様で最大でも1ヶ月
  //7日
  res.setHeader("Cache-Control", "s-maxage=604800");
  res.setHeader("Content-type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=${fileName}.pdf`);

  //WHATWGのfetchで得られるReadableStreamはNode.jsのinternal.Readableとは別物なので、そのままではpipeできない
  const reader = assetRes.body.getReader();
  const stream = new Readable({
    read() {
      reader.read().then(({ done, value }) => {
        if (done) {
          this.push(null);
        } else {
          this.push(value);
        }
      });
    },
  });
  stream.pipe(res);
};

export default handler;
