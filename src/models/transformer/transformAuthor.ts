import { Entry } from "contentful";

import { TypeAuthorSkeleton } from "@/models/contentful";
import { AuthorModel } from "@/models/models";

export const transformAuthorModel = (
  author: Entry<TypeAuthorSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): AuthorModel => {
  const { fullName, familyNameJa, familyNameEn, givenNameJa, givenNameEn } =
    author.fields;

  return {
    id: author.sys.id,
    fullName,
    familyName: {
      ja: familyNameJa,
      en: familyNameEn,
    },
    givenName: {
      ja: givenNameJa,
      en: givenNameEn,
    },
  };
};
