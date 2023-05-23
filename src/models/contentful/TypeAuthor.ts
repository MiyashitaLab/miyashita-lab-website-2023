import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAuthorFields {
    fullname: EntryFieldTypes.Symbol;
    familyNameJa: EntryFieldTypes.Symbol;
    lastNameJa: EntryFieldTypes.Symbol;
    familyNameEn: EntryFieldTypes.Symbol;
    lastNameEn: EntryFieldTypes.Symbol;
}

export type TypeAuthorSkeleton = EntrySkeletonType<TypeAuthorFields, "author">;
export type TypeAuthor<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAuthorSkeleton, Modifiers, Locales>;
