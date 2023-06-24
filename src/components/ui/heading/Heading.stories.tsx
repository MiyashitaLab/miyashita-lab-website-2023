import { StoryObj } from "@storybook/react";

import { Heading } from "./Heading";
import { Icon } from "../icon";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Heading> = {
  title: "Heading",
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const News: Story = {
  args: {
    href: "#",
    children: (
      <>
        <Icon fontStyle="solid" name={"newspaper"} />
        <span>ニュース</span>
      </>
    ),
  },
};
