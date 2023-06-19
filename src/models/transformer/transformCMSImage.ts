import { AssetFile } from "contentful";

import { CMSImageWithSize } from "@/components/feature/wrapImage";

export const transformCMSImage = (
  asset: AssetFile | undefined
): CMSImageWithSize => {
  if (asset === undefined || asset.details.image === undefined) {
    throw new Error("Asset image not found");
  }

  return {
    src: `https:${asset.url}`,
    width: asset.details.image.width,
    height: asset.details.image.height,
  };
};
