import { fetchMemberSlugByAuthor } from "@/lib/cms/fetchMember";
import { fetchPaperIdListByAuthor } from "@/lib/cms/fetchPaper";
import { fetchSnapshotsSlug } from "@/lib/cms/fetchSnapshot";
import { ROUTES } from "@/lib/routes";

//newsなどで実際にHomeに表示されるエントリーかどうかを確認していないのは意図的
//古いエントリーを更新することは比較的少ないため、わざわざcontentfulAPIを叩いての確認はしない

/**
 * このモデルが編集された場合、どのページを更新すれば良いのかの関係定義
 */
export const modelDependencies = {
  author: async ({ id }) => {
    //authorを参照している論文
    const paperIdList = await fetchPaperIdListByAuthor(id).catch(() => []);

    //authorを参照しているメンバー
    const memberSlug = await fetchMemberSlugByAuthor(id).catch(() => undefined);

    return [
      ROUTES.HOME,
      ...paperIdList.map((paperId) => ROUTES.RESEARCH_DETAIL(paperId)),
      ...(memberSlug !== undefined ? [ROUTES.MEMBER_DETAIL(memberSlug)] : []),
    ];
  },
  member: async ({ id, slug }) => {
    const updatedRoutes = await updatedSlugRoutes(
      { id, slug },
      ROUTES.MEMBER_DETAIL
    );
    return [ROUTES.HOME, ROUTES.MEMBERS, ...updatedRoutes];
  },
  news: async ({ id, slug }) => {
    const updatedRoutes = await updatedSlugRoutes(
      { id, slug },
      ROUTES.NEWS_DETAIL
    );
    return [ROUTES.HOME, ROUTES.NEWS, ...updatedRoutes];
  },
  pages: async (_) => [ROUTES.COPYRIGHT, ROUTES.ABOUT, ROUTES.PRIVACY_POLICY],
  paper: async ({ id, slug }) => {
    const updatedRoutes = await updatedSlugRoutes(
      { id, slug },
      ROUTES.RESEARCH_DETAIL
    );

    return [ROUTES.HOME, ROUTES.RESEARCHES, ...updatedRoutes];
  },
  project: async ({ id, slug }) => {
    const updatedRoutes = await updatedSlugRoutes(
      { id, slug },
      ROUTES.PROJECT_DETAIL
    );

    return [ROUTES.HOME, ROUTES.PROJECTS, ...updatedRoutes];
  },
  top: async () => [ROUTES.HOME],
} as const satisfies Record<
  string,
  ({ id, slug }: { id: string; slug: string | undefined }) => Promise<string[]>
>;

/**
 * slugフィールドを持つエントリーに変更に対する、更新するべきページのパスを返す
 * slugがundefinedの場合はunpublishedされたとみなし、最新のversionのslugを返す
 * slugが変更された場合は、変更前のslugと変更後のslugの両方を返す
 *
 * @param id
 * @param slug
 * @param slugRoute
 */
const updatedSlugRoutes = async (
  { id, slug }: { id: string; slug: string | undefined },
  slugRoute: (slug: string) => string
): Promise<string[]> => {
  const snapshot = await fetchSnapshotsSlug(id);
  if (slug) {
    const prevSlug = snapshot[1]?.slug;
    if (prevSlug !== undefined && prevSlug !== slug) {
      //slugが変更された
      return [slugRoute(prevSlug), slugRoute(slug)];
    } else {
      //slugが変更されていない
      return [slugRoute(slug)];
    }
  } else {
    //unpublishedされた
    //最新のversionが対象のslug
    return [slugRoute(snapshot[0].slug)];
  }
};
