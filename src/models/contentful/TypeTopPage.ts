import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeTopPageFields {
    id: EntryFieldTypes.Symbol<"top">;
    title: EntryFieldTypes.Symbol;
    topImg: EntryFieldTypes.AssetLink;
    description: EntryFieldTypes.Text;
}

export type TypeTopPageSkeleton = EntrySkeletonType<TypeTopPageFields, "topPage">;
export type TypeTopPage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTopPageSkeleton, Modifiers, Locales>;
