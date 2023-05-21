import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

/**
 * Fields type definition for content type 'TypeTopPage'
 * @name TypeTopPageFields
 * @type {TypeTopPageFields}
 * @memberof TypeTopPage
 */
export interface TypeTopPageFields {
    /**
     * Field type definition for field 'id' (id)
     * @name id
     * @localized false
     */
    id: EntryFieldTypes.Symbol<"top">;
    /**
     * Field type definition for field 'title' (サイトタイトル)
     * @name サイトタイトル
     * @localized false
     */
    title: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'topImg' (トップ画像)
     * @name トップ画像
     * @localized false
     */
    topImg: EntryFieldTypes.AssetLink;
    /**
     * Field type definition for field 'description' (短い研究室紹介)
     * @name 短い研究室紹介
     * @localized false
     */
    description: EntryFieldTypes.Text;
}

/**
 * Entry skeleton type definition for content type 'topPage' (トップページ)
 * @name TypeTopPageSkeleton
 * @type {TypeTopPageSkeleton}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T16:19:12.990Z
 * @version 3
 */
export type TypeTopPageSkeleton = EntrySkeletonType<TypeTopPageFields, "topPage">;
/**
 * Entry type definition for content type 'topPage' (トップページ)
 * @name TypeTopPage
 * @type {TypeTopPage}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T16:19:12.990Z
 * @version 3
 */
export type TypeTopPage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTopPageSkeleton, Modifiers, Locales>;
