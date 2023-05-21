import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypePaper'
 * @name TypePaperFields
 * @type {TypePaperFields}
 * @memberof TypePaper
 */
export interface TypePaperFields {
    /**
     * Field type definition for field 'title' (タイトル)
     * @name タイトル
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'abstract' (アブストラクト)
     * @name アブストラクト
     * @localized false
     */
    abstract: EntryFieldTypes.Text;
    /**
     * Field type definition for field 'language' (言語)
     * @name 言語
     * @localized false
     */
    language: EntryFieldTypes.Symbol<"english" | "japanese">;
    /**
     * Field type definition for field 'author' (著者)
     * @name 著者
     * @localized false
     */
    author: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
    /**
     * Field type definition for field 'type' (種別)
     * @name 種別
     * @localized false
     */
    type: EntryFieldTypes.Symbol<"journal" | "proceeding" | "report" | "thesis">;
    /**
     * Field type definition for field 'keyword' (キーワード)
     * @name キーワード
     * @localized false
     */
    keyword: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    /**
     * Field type definition for field 'publishUrl' (公開元url)
     * @name 公開元url
     * @localized false
     */
    publishUrl?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'publicationDate' (発行日)
     * @name 発行日
     * @localized false
     */
    publicationDate: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'pdf' (論文pdf)
     * @name 論文pdf
     * @localized false
     */
    pdf?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'journalTitle' (書誌名)
     * @name 書誌名
     * @localized false
     */
    journalTitle: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'volume' (巻（volume）)
     * @name 巻（volume）
     * @localized false
     */
    volume?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'issue' (号（issue）)
     * @name 号（issue）
     * @localized false
     */
    issue?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'firstPage' (開始ページ)
     * @name 開始ページ
     * @localized false
     */
    firstPage?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'lastPage' (終了ページ)
     * @name 終了ページ
     * @localized false
     */
    lastPage?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'copyrightHolder' (著作権保持者)
     * @name 著作権保持者
     * @localized false
     */
    copyrightHolder?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'thumbnail' (サムネイル画像)
     * @name サムネイル画像
     * @localized false
     */
    thumbnail?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'youtubeUrl' (youtubeURL)
     * @name youtubeURL
     * @localized false
     */
    youtubeUrl?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slidePdf' (スライドPDF)
     * @name スライドPDF
     * @localized false
     */
    slidePdf?: EntryFieldTypes.AssetLink;
}

/**
 * Entry skeleton type definition for content type 'paper' (論文)
 * @name TypePaperSkeleton
 * @type {TypePaperSkeleton}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T15:22:24.730Z
 * @version 13
 */
export type TypePaperSkeleton = EntrySkeletonType<TypePaperFields, "paper">;
/**
 * Entry type definition for content type 'paper' (論文)
 * @name TypePaper
 * @type {TypePaper}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T15:22:24.730Z
 * @version 13
 */
export type TypePaper<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePaperSkeleton, Modifiers, Locales>;
