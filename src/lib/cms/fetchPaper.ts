import { client } from "@/lib/cms/contentfulClient";
import { TypePaperSkeleton } from "@/models/contentful";
import { PaperModel, PartialPaperModel } from "@/models/models";
import {
  transformPaperModel,
  transformPartialPaperModel,
} from "@/models/transformer/transformPaper";

export const fetchPartialPaperList = async (): Promise<PartialPaperModel[]> => {
  const papers =
    await client.withoutUnresolvableLinks.getEntries<TypePaperSkeleton>({
      content_type: "paper",
      order: ["-fields.publicationDate"],
    });

  return papers.items.map((paper) => transformPartialPaperModel(paper));
};

export const fetchPaper = async (id: string): Promise<PaperModel> => {
  const paperEntry =
    await client.withoutUnresolvableLinks.getEntry<TypePaperSkeleton>(id, {});

  if (paperEntry === undefined) {
    throw new Error("Paper not found");
  }

  return transformPaperModel(paperEntry);
};
