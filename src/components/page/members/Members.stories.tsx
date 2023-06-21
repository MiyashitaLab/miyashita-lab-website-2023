import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import { Members } from "./Members";

import { MemberCardsSectionImage } from "@/components/page/top/MemberCardsSection";
import { MemberCard } from "@/components/ui/memberCard";
import { memberModelMock } from "@/models/mockData";
import { Layout } from "src/components/page/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Members> = {
  title: "Pages/Members",
  component: Members,
};

export default meta;

type Story = StoryObj<typeof Members>;

export const Primary: Story = {
  args: {
    enrolledCardsHeading: "現役メンバー",
    enrolledCards: faker.helpers
      .multiple(() => memberModelMock(faker), { count: 10 })
      .map((member) => (
        <MemberCard
          key={member.slug}
          href={member.slug}
          role={member.displayRole}
          name={member.name}
        >
          <MemberCardsSectionImage src={member.thumbnail.src} />
        </MemberCard>
      )),
    graduatedCardsHeading: "歴代メンバー",
    graduatedCards: faker.helpers
      .multiple(() => memberModelMock(faker), { count: 20 })
      .map((member) => (
        <MemberCard
          key={member.slug}
          href={member.slug}
          role={member.displayRole}
          name={member.name}
        >
          <MemberCardsSectionImage src={member.thumbnail.src} />
        </MemberCard>
      )),
  },
  render: (args) => (
    <Layout>
      <Members {...args} />
    </Layout>
  ),
};
