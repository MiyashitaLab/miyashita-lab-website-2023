import { StoryObj } from "@storybook/react";

import { General } from "./General";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof General> = {
  title: "Pages/General",
  component: General,
};

export default meta;

type Story = StoryObj<typeof General>;

export const Primary: Story = {
  args: {
    headingText: "About",
    content: `
# H1
文章
`,
  },
};
