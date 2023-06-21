import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import {
  MemberCardsSection,
  MemberCardsSectionImage,
} from "./MemberCardsSection";

import { Icon } from "@/components/ui/icon";
import { MemberCard } from "@/components/ui/memberCard";
import { memberModelMock } from "@/models/mockData";

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
    children: faker.helpers
      .multiple(() => memberModelMock(faker), { count: 8 })
      .map((member) => (
        <MemberCard
          key={member.slug}
          href={member.slug}
          name={member.name}
          role={member.displayRole}
        >
          <MemberCardsSectionImage src={member.thumbnail.src} />
        </MemberCard>
      )),
  },
} as const satisfies Story;
