import { StoryObj } from "@storybook/react";

import { PageFooter } from "./PageFooter";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof PageFooter> = {
  title: "PageFooter",
  component: PageFooter,
};

export default meta;

type Story = StoryObj<typeof PageFooter>;

export const Primary: Story = {
  args: {
    copyright: "© 2023 Miyashita Lab",
    links: [
      {
        text: "Copyright Notice",
        href: "/copyright",
      },
      {
        text: "Privacy Policy",
        href: "/privacy",
      },
      {
        text: "Contact",
        href: "/contact",
      },
    ],
  },
};
