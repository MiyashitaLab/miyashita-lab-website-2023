import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeNewsFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    date: EntryFieldTypes.Date;
    thumbnail?: EntryFieldTypes.AssetLink;
    content: EntryFieldTypes.Text;
}

export type TypeNewsSkeleton = EntrySkeletonType<TypeNewsFields, "news">;
export type TypeNews<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNewsSkeleton, Modifiers, Locales>;
