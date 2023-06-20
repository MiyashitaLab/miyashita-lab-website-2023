import { Entry } from "contentful";

import { TypeAuthorSkeleton } from "@/models/contentful";
import { AuthorModel } from "@/models/models";

export const transformAuthorModel = (
  author: Entry<TypeAuthorSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): AuthorModel => {
  const { fullName, familyNameJa, familyNameEn, lastNameJa, lastNameEn } =
    author.fields;

  return {
    fullName,
    familyName: {
      ja: familyNameJa,
      en: familyNameEn,
    },
    lastName: {
      ja: lastNameJa,
      en: lastNameEn,
    },
  };
};
