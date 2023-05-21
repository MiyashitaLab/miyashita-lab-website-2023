import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypePages'
 * @name TypePagesFields
 * @type {TypePagesFields}
 * @memberof TypePages
 */
export interface TypePagesFields {
    /**
     * Field type definition for field 'slug' (slug)
     * @name slug
     * @localized false
     */
    slug: EntryFieldTypes.Symbol<"about" | "copyright" | "privacy-policy">;
    /**
     * Field type definition for field 'content' (本文)
     * @name 本文
     * @localized false
     */
    content: EntryFieldTypes.Text;
}

/**
 * Entry skeleton type definition for content type 'pages' (各種ページ)
 * @name TypePagesSkeleton
 * @type {TypePagesSkeleton}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T16:15:03.249Z
 * @version 3
 */
export type TypePagesSkeleton = EntrySkeletonType<TypePagesFields, "pages">;
/**
 * Entry type definition for content type 'pages' (各種ページ)
 * @name TypePages
 * @type {TypePages}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T16:15:03.249Z
 * @version 3
 */
export type TypePages<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePagesSkeleton, Modifiers, Locales>;
