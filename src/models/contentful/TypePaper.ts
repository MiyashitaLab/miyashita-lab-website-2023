import type { TypeAuthorSkeleton } from "./TypeAuthor";
import type { TypeCopyrightSkeleton } from "./TypeCopyright";
import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypePaperFields {
    title: EntryFieldTypes.Symbol;
    abstract?: EntryFieldTypes.Text;
    language: EntryFieldTypes.Symbol<"english" | "japanese">;
    author: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAuthorSkeleton>>;
    type: EntryFieldTypes.Symbol<"journal" | "proceeding" | "report" | "thesis">;
    keyword: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    publishUrl?: EntryFieldTypes.Symbol;
    publicationDate: EntryFieldTypes.Date;
    pdf?: EntryFieldTypes.AssetLink;
    journalTitle: EntryFieldTypes.Symbol;
    volume?: EntryFieldTypes.Symbol;
    issue?: EntryFieldTypes.Symbol;
    firstPage?: EntryFieldTypes.Symbol;
    lastPage?: EntryFieldTypes.Symbol;
    publisher?: EntryFieldTypes.Symbol;
    copyrightHolder?: EntryFieldTypes.Symbol;
    copyright?: EntryFieldTypes.EntryLink<TypeCopyrightSkeleton>;
    customMetaList?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    thumbnail?: EntryFieldTypes.AssetLink;
    youtubeUrl?: EntryFieldTypes.Symbol;
    slidePdf?: EntryFieldTypes.AssetLink;
}

export type TypePaperSkeleton = EntrySkeletonType<TypePaperFields, "paper">;
export type TypePaper<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePaperSkeleton, Modifiers, Locales>;
