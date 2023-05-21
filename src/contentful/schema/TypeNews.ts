import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeNews'
 * @name TypeNewsFields
 * @type {TypeNewsFields}
 * @memberof TypeNews
 */
export interface TypeNewsFields {
    /**
     * Field type definition for field 'title' (タイトル)
     * @name タイトル
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slug' (slug)
     * @name slug
     * @localized false
     */
    slug: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'date' (日付)
     * @name 日付
     * @localized false
     */
    date: EntryFieldTypes.Date;
    /**
     * Field type definition for field 'thumbnail' (サムネイル)
     * @name サムネイル
     * @localized false
     */
    thumbnail?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'content' (本文)
     * @name 本文
     * @localized false
     */
    content: EntryFieldTypes.Text;
}

/**
 * Entry skeleton type definition for content type 'news' (ニュース)
 * @name TypeNewsSkeleton
 * @type {TypeNewsSkeleton}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-17T15:04:45.111Z
 * @version 5
 */
export type TypeNewsSkeleton = EntrySkeletonType<TypeNewsFields, "news">;
/**
 * Entry type definition for content type 'news' (ニュース)
 * @name TypeNews
 * @type {TypeNews}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-17T15:04:45.111Z
 * @version 5
 */
export type TypeNews<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNewsSkeleton, Modifiers, Locales>;
