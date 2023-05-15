import { StoryObj } from "@storybook/react";

import { MemberCardsSection } from "./MemberCardsSection";

import { Primary } from "@/components/page/top/Top.stories";
import { Icon } from "@/components/ui/icon";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof MemberCardsSection> = {
  title: "Pages/Top/MemberCardsSection",
  component: MemberCardsSection,
};

export default meta;

type Story = StoryObj<typeof MemberCardsSection>;

export const Member = {
  args: {
    href: "/member",
    headingIcon: <Icon fontStyle="solid" name={"users"} />,
    headingText: "メンバー",
    cards: Primary.args.member.cards,
  },
} as const satisfies Story;
