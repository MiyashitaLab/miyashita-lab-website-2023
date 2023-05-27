import { StoryObj } from "@storybook/react";

import { ArticleCardDescription } from "./ArticleCardDescription";

import { Icon } from "@/components/ui/icon";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ArticleCardDescription> = {
  title: "ArticleCardDescription",
  component: ArticleCardDescription,
};

export default meta;

type Story = StoryObj<typeof ArticleCardDescription>;

export const Primary: Story = {
  args: {
    items: [
      {
        icon: <Icon fontStyle={"solid"} name={"user-pen"} />,
        text: "Author",
      },
      {
        icon: <Icon fontStyle={"solid"} name={"book"} />,
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n",
      },
    ],
  },
};
