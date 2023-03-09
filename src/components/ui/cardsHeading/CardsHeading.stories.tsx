import { StoryObj } from "@storybook/react";

import { CardsHeading } from "./CardsHeading";
import { Icon } from "../icon";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof CardsHeading> = {
  title: "CardsHeading",
  component: CardsHeading,
};

export default meta;

type Story = StoryObj<typeof CardsHeading>;

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
