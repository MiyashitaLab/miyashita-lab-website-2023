import { StoryObj } from "@storybook/react";

import { Top } from "./Top";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Top> = {
  title: "Top",
  component: Top,
};

export default meta;

type Story = StoryObj<typeof Top>;

const cardMock = {
  detailUrl: "/news/1",
  title: "ニュースタイトル",
  date: new Date(),
  thumbnail: {
    url: "/temp/noimage.png",
    width: 800,
    height: 450,
  },
};

const projectCardMock = {
  detailUrl: "/projects/1",
  title: "プロジェクトタイトル",
  thumbnail: {
    url: "/temp/noimage.png",
    width: 800,
    height: 450,
  },
};

export const Primary = {
  args: {
    headImage: {
      url: "/temp/homeHeader.png",
      width: 1280,
      height: 360,
    },
    news: {
      url: "/news",
      cards: [
        cardMock,
        cardMock,
        cardMock,
        cardMock,
        {
          ...cardMock,
          title: "インタラクション2023に参加しました",
        },
        cardMock,
        cardMock,
        cardMock,
      ],
    },
    paper: {
      url: "/researches",
      cards: [
        cardMock,
        cardMock,
        cardMock,
        cardMock,
        {
          ...cardMock,
          title: "インタラクション2023に参加しました",
        },
        cardMock,
        cardMock,
        cardMock,
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
      cards: [],
    },
  },
} as const satisfies Story;
