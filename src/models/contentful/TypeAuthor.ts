import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAuthorFields {
    fullName: EntryFieldTypes.Symbol;
    familyNameJa: EntryFieldTypes.Symbol;
    givenNameJa: EntryFieldTypes.Symbol;
    familyNameEn: EntryFieldTypes.Symbol;
    givenNameEn: EntryFieldTypes.Symbol;
}

export type TypeAuthorSkeleton = EntrySkeletonType<TypeAuthorFields, "author">;
export type TypeAuthor<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAuthorSkeleton, Modifiers, Locales>;
