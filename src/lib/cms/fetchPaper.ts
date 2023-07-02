import { client } from "@/lib/cms/contentfulClient";
import { fetchAllEntries } from "@/lib/cms/fetchAllEntries";
import { TypePaperSkeleton } from "@/models/contentful";
import { PaperModel, PartialPaperModel } from "@/models/models";
import {
  transformPaperModel,
  transformPartialPaperModel,
} from "@/models/transformer/transformPaper";

export const fetchLatestPartialPaperList = async (
  entryNum: number
): Promise<PartialPaperModel[]> => {
  const papers =
    await client.withoutUnresolvableLinks.getEntries<TypePaperSkeleton>({
      content_type: "paper",
      select: [
        "sys.id",
        "fields.title",
        "fields.abstract",
        "fields.publicationDate",
        "fields.language",
        "fields.author",
        "fields.type",
        "fields.journalTitle",
        "fields.keyword",
        "fields.thumbnail",
      ],
      order: ["-fields.publicationDate"],
      limit: entryNum,
    });

  return papers.items.map((paper) => transformPartialPaperModel(paper));
};

export const fetchPartialPaperList = async (): Promise<PartialPaperModel[]> => {
  const papers = await fetchAllEntries<TypePaperSkeleton>({
    content_type: "paper",
    select: [
      "sys.id",
      "fields.title",
      "fields.abstract",
      "fields.publicationDate",
      "fields.language",
      "fields.author",
      "fields.type",
      "fields.journalTitle",
      "fields.keyword",
      "fields.thumbnail",
    ],
    order: ["-fields.publicationDate"],
  });

  return papers.map((paper) => transformPartialPaperModel(paper));
};

export const fetchPaperIdListByAuthor = async (
  authorId: string
): Promise<string[]> => {
  //https://github.com/contentful/contentful.js/blob/master/TYPESCRIPT.md#limitation
  //referenceするfieldでのクエリは型が効かないので注意
  const queryParam = { "fields.author.sys.id": authorId };

  const papers = await fetchAllEntries<TypePaperSkeleton>({
    content_type: "paper",
    select: ["fields.author", "sys.id"],
    ...queryParam,
  });

  return papers.map((paper) => paper.sys.id);
};

export const fetchPaper = async (id: string): Promise<PaperModel> => {
  const paperEntry =
    await client.withoutUnresolvableLinks.getEntry<TypePaperSkeleton>(id, {});

  if (paperEntry === undefined) {
    throw new Error("Paper not found");
  }

  return transformPaperModel(paperEntry);
};
