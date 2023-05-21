import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";

/**
 * Fields type definition for content type 'TypeMember'
 * @name TypeMemberFields
 * @type {TypeMemberFields}
 * @memberof TypeMember
 */
export interface TypeMemberFields {
    /**
     * Field type definition for field 'name' (氏名)
     * @name 氏名
     * @localized false
     */
    name: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'slug' (slug)
     * @name slug
     * @localized false
     */
    slug?: EntryFieldTypes.Symbol;
    /**
     * Field type definition for field 'role' (ロール)
     * @name ロール
     * @localized false
     */
    role: EntryFieldTypes.Symbol<"学生" | "教員">;
    /**
     * Field type definition for field 'content' (紹介文)
     * @name 紹介文
     * @localized false
     */
    content?: EntryFieldTypes.Text;
    /**
     * Field type definition for field 'b1year' (B1年度)
     * @name B1年度
     * @localized false
     */
    b1year: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'b2year' (B2年度)
     * @name B2年度
     * @localized false
     */
    b2year?: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'b3year' (B3年度)
     * @name B3年度
     * @localized false
     */
    b3year?: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'b4year' (B4年度)
     * @name B4年度
     * @localized false
     */
    b4year?: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'm1year' (M1年度)
     * @name M1年度
     * @localized false
     */
    m1year?: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'm2year' (M2年度)
     * @name M2年度
     * @localized false
     */
    m2year?: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'd1year' (D1年度)
     * @name D1年度
     * @localized false
     */
    d1year?: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'd2year' (D2年度)
     * @name D2年度
     * @localized false
     */
    d2year?: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'd3year' (D3年度)
     * @name D3年度
     * @localized false
     */
    d3year?: EntryFieldTypes.Integer;
    /**
     * Field type definition for field 'author' (論文著者)
     * @name 論文著者
     * @localized false
     */
    author?: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
}

/**
 * Entry skeleton type definition for content type 'member' (メンバー)
 * @name TypeMemberSkeleton
 * @type {TypeMemberSkeleton}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T14:44:49.566Z
 * @version 5
 */
export type TypeMemberSkeleton = EntrySkeletonType<TypeMemberFields, "member">;
/**
 * Entry type definition for content type 'member' (メンバー)
 * @name TypeMember
 * @type {TypeMember}
 * @author 4P33ZffjyItYHnkcNRtQih
 * @since 2023-05-21T14:44:49.566Z
 * @version 5
 */
export type TypeMember<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeMemberSkeleton, Modifiers, Locales>;
