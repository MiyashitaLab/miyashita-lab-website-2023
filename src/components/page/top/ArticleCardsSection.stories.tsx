import { StoryObj } from "@storybook/react";

import { ArticleCardsSection } from "./ArticleCardsSection";

import { Icon } from "@/components/ui/icon";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ArticleCardsSection> = {
  title: "Top/ArticleCardsSection",
  component: ArticleCardsSection,
};

export default meta;

type Story = StoryObj<typeof ArticleCardsSection>;

const cardMock = {
  detailUrl: "/news/1",
  title: "ニュースタイトル",
  date: new Date(),
  thumbnail: {
    url: "/temp/noimage.png",
    width: 384,
    height: 216,
  },
};

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
      cardMock,
      cardMock,
      cardMock,
    ],
    headingContent: (
      <>
        <Icon fontStyle="solid" name={"book"} />
        <span>論文リポジトリ</span>
      </>
    ),
  },
};
