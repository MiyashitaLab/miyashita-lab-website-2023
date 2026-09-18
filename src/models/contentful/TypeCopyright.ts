import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCopyrightFields {
    copyright: EntryFieldTypes.Symbol;
}

export type TypeCopyrightSkeleton = EntrySkeletonType<TypeCopyrightFields, "copyright">;
export type TypeCopyright<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCopyrightSkeleton, Modifiers, Locales>;
