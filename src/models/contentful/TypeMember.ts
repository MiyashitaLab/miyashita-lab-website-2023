import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";

export interface TypeMemberFields {
    name: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    role: EntryFieldTypes.Symbol<"学生" | "教員">;
    content?: EntryFieldTypes.Text;
    b1year: EntryFieldTypes.Integer;
    b2year?: EntryFieldTypes.Integer;
    b3year?: EntryFieldTypes.Integer;
    b4year?: EntryFieldTypes.Integer;
    m1year?: EntryFieldTypes.Integer;
    m2year?: EntryFieldTypes.Integer;
    d1year?: EntryFieldTypes.Integer;
    d2year?: EntryFieldTypes.Integer;
    d3year?: EntryFieldTypes.Integer;
    author?: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
}

export type TypeMemberSkeleton = EntrySkeletonType<TypeMemberFields, "member">;
export type TypeMember<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMemberSkeleton, Modifiers, Locales>;
