import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePagesFields {
    slug: EntryFieldTypes.Symbol<"about" | "copyright" | "privacy-policy">;
    title: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.Text;
    centering: EntryFieldTypes.Boolean;
}

export type TypePagesSkeleton = EntrySkeletonType<TypePagesFields, "pages">;
export type TypePages<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePagesSkeleton, Modifiers, Locales>;
