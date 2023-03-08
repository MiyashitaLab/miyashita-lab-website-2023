import { StoryObj } from "@storybook/react";
import Image from "next/image";

import { MemberTile } from "./MemberTile";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof MemberTile> = {
  title: "MemberTile",
  component: MemberTile,
};

export default meta;

type Story = StoryObj<typeof MemberTile>;

export const Primary: Story = {
  args: {
    className: "w-48",
    url: "#",
    role: "role",
    name: "name",
    children: (
      <Image
        src="https://i.gyazo.com/1ee443ccf53c4ba849d2419b88bbc790.png"
        alt={"dummy image"}
        width={200}
        height={200}
      />
    ),
    //write your args here
  },
};

export const Homei: Story = {
  args: {
    className: "w-48",
    url: "#",
    role: "教員",
    name: "宮下芳名",
    children: (
      <Image
        src="https://i.gyazo.com/7a9e59db4794de41d8eedea10843e6cb.webp"
        alt={""}
        width={200}
        height={200}
      />
    ),
  },
};

export const OB: Story = {
  args: {
    className: "w-48",
    url: "#",
    role: "2021年度卒業",
    name: "dummy no nagainame",
    isLongName: true,
    children: (
      <Image
        src="https://i.gyazo.com/1ee443ccf53c4ba849d2419b88bbc790.png"
        alt={"dummy image"}
        width={200}
        height={200}
      />
    ),
  },
};
