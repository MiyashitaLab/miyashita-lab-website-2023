import { StoryObj } from "@storybook/react";

import { ArticleCardData, ArticleCardsSection } from "./ArticleCardsSection";

import { Icon } from "@/components/ui/icon";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ArticleCardsSection> = {
  title: "Top/ArticleCardsSection",
  component: ArticleCardsSection,
};

export default meta;

type Story = StoryObj<typeof ArticleCardsSection>;

const cardMock = {
  detailHref: "/news/1",
  title: "ニュースタイトル",
  date: new Date(),
  thumbnail: {
    src: "/temp/1200x630.png",
    originalWidth: 1200,
    originalHeight: 630,
  },
} satisfies ArticleCardData;

export const News: Story = {
  args: {
    href: "#",
    cards: [
      cardMock,
      {
        ...cardMock,
        title: "インタラクション2023に参加しました",
      },
      cardMock,
      cardMock,
      cardMock,
      {
        ...cardMock,
        thumbnail: {
          src: "/temp/1080x1080.png",
          originalWidth: 1080,
          originalHeight: 1080,
        },
      },
      {
        ...cardMock,
        thumbnail: {
          src: "/temp/1280x720.png",
          originalWidth: 1280,
          originalHeight: 720,
        },
      },
      {
        ...cardMock,
        thumbnail: {
          src: "/temp/1280x960.png",
          originalWidth: 1280,
          originalHeight: 960,
        },
      },
    ],
    headingIcon: <Icon fontStyle="solid" name={"book"} />,
    headingText: "論文リポジトリ",
  },
};
