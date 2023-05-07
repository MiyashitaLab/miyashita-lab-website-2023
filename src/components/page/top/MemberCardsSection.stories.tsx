import { StoryObj } from "@storybook/react";

import { MemberCardData, MemberCardsSection } from "./MemberCardsSection";

import { Icon } from "@/components/ui/icon";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof MemberCardsSection> = {
  title: "Top/MemberCardsSection",
  component: MemberCardsSection,
};

export default meta;

type Story = StoryObj<typeof MemberCardsSection>;

const cardMock = (index: number) =>
  ({
    detailHref: `/member/${index}`,
    name: "KIM MINJI",
    role: "B3",
    thumbnail: {
      src: "/temp/400x400.png",
      originalWidth: 400,
      originalHeight: 400,
    },
  } satisfies MemberCardData);

export const Member = {
  args: {
    href: "#",
    //連番
    cards: [...Array(18)].map((i) => cardMock(i)),
    headingIcon: <Icon fontStyle="solid" name={"users"} />,
    headingText: "メンバー",
  },
} as const satisfies Story;
