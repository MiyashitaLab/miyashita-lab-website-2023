import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeProjectFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    thumbnail?: EntryFieldTypes.AssetLink;
    category: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.Text;
    test?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;
