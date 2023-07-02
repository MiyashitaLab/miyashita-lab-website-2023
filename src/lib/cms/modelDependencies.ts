import { fetchMemberSlugByAuthor } from "@/lib/cms/fetchMember";
import { fetchPaperIdListByAuthor } from "@/lib/cms/fetchPaper";
import { ROUTES } from "@/lib/routes";

//newsなどで実際にHomeに表示されるエントリーかどうかを確認していないのは意図的
//古いエントリーを更新することは比較的少ないため、わざわざcontentfulAPIを叩いての確認はしない

/**
 * このモデルが編集された場合、どのページを更新すれば良いのかの関係定義
 */
export const modelDependencies = {
  author: async (id: string) => {
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
  member: async (slug: string) => [
    ROUTES.HOME,
    ROUTES.MEMBERS,
    ROUTES.MEMBER_DETAIL(slug),
  ],
  news: async (slug: string) => [
    ROUTES.HOME,
    ROUTES.NEWS,
    ROUTES.NEWS_DETAIL(slug),
  ],
  pages: async (_: string) => [
    ROUTES.COPYRIGHT,
    ROUTES.ABOUT,
    ROUTES.PRIVACY_POLICY,
  ],
  paper: async (slug: string) => [
    ROUTES.HOME,
    ROUTES.RESEARCHES,
    ROUTES.RESEARCH_DETAIL(slug),
  ],
  project: async (slug: string) => [
    ROUTES.HOME,
    ROUTES.PROJECTS,
    ROUTES.PROJECT_DETAIL(slug),
  ],
  top: async () => [ROUTES.HOME],
} as const satisfies Record<string, (id: string) => Promise<string[]>>;
