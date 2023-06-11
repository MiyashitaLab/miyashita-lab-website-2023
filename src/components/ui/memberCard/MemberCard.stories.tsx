import { StoryObj } from "@storybook/react";
import Image from "next/image";

import { MemberCard } from "./MemberCard";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof MemberCard> = {
  title: "MemberCard",
  component: MemberCard,
  render: (args) => (
    <div className={"w-48"}>
      <MemberCard {...args} />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof MemberCard>;

export const Primary: Story = {
  args: {
    href: "#",
    role: "role",
    name: "name",
    children: (
      <Image
        src="./member-default.png"
        alt={"dummy image"}
        width={400}
        height={400}
      />
    ),
  },
};

export const Homei: Story = {
  args: {
    href: "#",
    role: "教員",
    name: "宮下芳明",
    children: (
      <Image src="./member-default.png" alt={""} width={400} height={400} />
    ),
  },
};

export const OB: Story = {
  args: {
    href: "#",
    role: "2021年度卒業",
    name: "dummy no nagainame",
    children: (
      <Image
        src="./member-default.png"
        alt={"dummy image"}
        width={400}
        height={400}
      />
    ),
  },
};
