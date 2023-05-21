import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeAuthor'
 * @name TypeAuthorFields
 * @type {TypeAuthorFields}
 * @memberof TypeAuthor
 */
export interface TypeAuthorFields {
    /**
     * Field type definition for field 'fullname' (フルネーム)
     * @name フルネーム
     * @localized false
     */
    fullname: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'familyNameJa' (姓)
     * @name 姓
     * @localized false
     */
    familyNameJa: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'lastNameJa' (名)
     * @name 名
     * @localized false
     */
    lastNameJa: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'familyNameEn' (姓（英）)
     * @name 姓（英）
     * @localized false
     */
    familyNameEn: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'lastNameEn' (名（英）)
     * @name 名（英）
     * @localized false
     */
    lastNameEn: EntryFieldTypes.Symbol;
}

/**
 * Entry skeleton type definition for content type 'author' (論文著者)
 * @name TypeAuthorSkeleton
 * @type {TypeAuthorSkeleton}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T15:51:02.034Z
 * @version 5
 */
export type TypeAuthorSkeleton = EntrySkeletonType<TypeAuthorFields, "author">;
/**
 * Entry type definition for content type 'author' (論文著者)
 * @name TypeAuthor
 * @type {TypeAuthor}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T15:51:02.034Z
 * @version 5
 */
export type TypeAuthor<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAuthorSkeleton, Modifiers, Locales>;
