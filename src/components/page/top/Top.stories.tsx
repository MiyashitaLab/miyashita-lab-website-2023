import { StoryObj } from "@storybook/react";

import { Top } from "./Top";

import { ArticleCardData } from "@/components/page/top/ArticleCardsSection";
import { MemberCardData } from "@/components/page/top/MemberCardsSection";
import { Layout } from "@/components/ui/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Top> = {
  title: "Pages/Top",
  component: Top,
};

export default meta;

type Story = StoryObj<typeof Top>;

const articleCardMock = (i: number) =>
  ({
    detailHref: `/news/${i}`,
    title: "ニュースタイトル",
    date: new Date(),
    thumbnail: {
      src: "/temp/noimage.png",
      originalWidth: 800,
      originalHeight: 450,
    },
  } satisfies ArticleCardData);

const projectCardMock = (i: number) =>
  ({
    detailHref: `/projects/${i}`,
    title: "プロジェクトタイトル",
    thumbnail: {
      src: "/temp/noimage.png",
      originalWidth: 800,
      originalHeight: 450,
    },
  } satisfies ArticleCardData);

const memberCardMock = (index: number) =>
  ({
    detailHref: `/member/${index}`,
    name: "宮下芳明",
    role: "教員",
    thumbnail: {
      src: "/temp/400x400.png",
      originalWidth: 400,
      originalHeight: 400,
    },
  } satisfies MemberCardData);

export const Primary = {
  args: {
    headImage: {
      src: "/temp/homeHeader.png",
      originalWidth: 1280,
      originalHeight: 360,
    },
    news: {
      url: "/news",
      cards: [
        articleCardMock(0),
        articleCardMock(1),
        articleCardMock(2),
        articleCardMock(3),
        {
          ...articleCardMock(4),
          title: "インタラクション2023に参加しました",
        },
        articleCardMock(5),
        articleCardMock(6),
        articleCardMock(7),
      ],
    },
    paper: {
      url: "/researches",
      cards: [
        articleCardMock(0),
        {
          ...articleCardMock(1),
          title: "インタラクション2023に参加しました",
        },
        articleCardMock(2),
        articleCardMock(3),
        articleCardMock(4),
      ],
    },
    project: {
      url: "/projects",
      cards: [
        projectCardMock(0),
        projectCardMock(1),
        projectCardMock(2),
        projectCardMock(3),
        projectCardMock(4),
        projectCardMock(5),
        projectCardMock(6),
        projectCardMock(7),
      ],
    },
    member: {
      url: "/members",
      cards: [...Array(18)].map((_, i) => memberCardMock(i)),
    },
  },
  render: (args) => (
    <Layout>
      <Top {...args} />
    </Layout>
  ),
} as const satisfies Story;
