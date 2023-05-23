import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";

export interface TypeMemberFields {
    name: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    role: EntryFieldTypes.Symbol<"professor" | "student">;
    content?: EntryFieldTypes.Text;
    author?: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
    enrolledYear: EntryFieldTypes.Integer;
    graduatedYear: EntryFieldTypes.Integer;
    status: EntryFieldTypes.Symbol<"auto" | "bachelor" | "doctor" | "enrolled" | "master" | "withdrawn">;
    schoolYear: EntryFieldTypes.Symbol<"B1" | "B2" | "B3" | "B4" | "D1" | "D2" | "D3" | "M1" | "M2" | "auto">;
}

export type TypeMemberSkeleton = EntrySkeletonType<TypeMemberFields, "member">;
export type TypeMember<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMemberSkeleton, Modifiers, Locales>;
