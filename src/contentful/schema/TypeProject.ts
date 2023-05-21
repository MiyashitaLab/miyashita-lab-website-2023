import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeProject'
 * @name TypeProjectFields
 * @type {TypeProjectFields}
 * @memberof TypeProject
 */
export interface TypeProjectFields {
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
     * Field type definition for field 'thumbnail' (サムネイル画像)
     * @name サムネイル画像
     * @localized false
     */
    thumbnail?: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'category' (カテゴリ)
     * @name カテゴリ
     * @localized false
     */
    category: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'content' (本文)
     * @name 本文
     * @localized false
     */
    content: EntryFieldTypes.Text;
    /**
     * Field type definition for field 'test' (test)
     * @name test
     * @localized false
     */
    test?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

/**
 * Entry skeleton type definition for content type 'project' (プロジェクト)
 * @name TypeProjectSkeleton
 * @type {TypeProjectSkeleton}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T15:58:35.452Z
 * @version 7
 */
export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
/**
 * Entry type definition for content type 'project' (プロジェクト)
 * @name TypeProject
 * @type {TypeProject}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T15:58:35.452Z
 * @version 7
 */
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;
