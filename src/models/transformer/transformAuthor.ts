import { Entry } from "contentful";

import { TypeAuthorSkeleton } from "@/models/contentful";
import { AuthorModel } from "@/models/models";

export const transformAuthorModel = (
  author: Entry<TypeAuthorSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
): AuthorModel => {
  return {
    fullName: author.fields.fullName,
    familyName: {
      ja: author.fields.familyNameJa,
      en: author.fields.familyNameEn,
    },
    lastName: {
      ja: author.fields.lastNameJa,
      en: author.fields.lastNameEn,
    },
  };
};
