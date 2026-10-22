import { StoryObj } from "@storybook/nextjs";

import { Heading } from "./Heading";
import { Icon } from "../icon";

import type { Meta } from "@storybook/nextjs";

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
