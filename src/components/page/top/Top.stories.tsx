import { StoryObj } from "@storybook/react";

import { Top } from "./Top";

import { ArticleCardData } from "@/components/page/top/ArticleCardsSection";
import { MemberCardData } from "@/components/page/top/MemberCardsSection";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Top> = {
  title: "Top",
  component: Top,
};

export default meta;

type Story = StoryObj<typeof Top>;

const articleCardMock = {
  detailHref: "/news/1",
  title: "ニュースタイトル",
  date: new Date(),
  thumbnail: {
    src: "/temp/noimage.png",
    originalWidth: 800,
    originalHeight: 450,
  },
} satisfies ArticleCardData;

const projectCardMock = {
  detailHref: "/projects/1",
  title: "プロジェクトタイトル",
  thumbnail: {
    src: "/temp/noimage.png",
    originalWidth: 800,
    originalHeight: 450,
  },
} satisfies ArticleCardData;

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
        articleCardMock,
        articleCardMock,
        articleCardMock,
        articleCardMock,
        {
          ...articleCardMock,
          title: "インタラクション2023に参加しました",
        },
        articleCardMock,
        articleCardMock,
        articleCardMock,
      ],
    },
    paper: {
      url: "/researches",
      cards: [
        articleCardMock,
        articleCardMock,
        articleCardMock,
        articleCardMock,
        {
          ...articleCardMock,
          title: "インタラクション2023に参加しました",
        },
        articleCardMock,
        articleCardMock,
        articleCardMock,
      ],
    },
    project: {
      url: "/projects",
      cards: [
        projectCardMock,
        projectCardMock,
        projectCardMock,
        projectCardMock,
        projectCardMock,
        projectCardMock,
        projectCardMock,
        projectCardMock,
      ],
    },
    member: {
      url: "/members",
      cards: [...Array(18)].map((i) => memberCardMock(i)),
    },
  },
} as const satisfies Story;
