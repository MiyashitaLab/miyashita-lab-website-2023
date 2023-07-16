import { StoryObj } from "@storybook/react";

import { HrLayout } from "./HrLayout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof HrLayout> = {
  title: "HrLayout",
  component: HrLayout,
};

export default meta;

type Story = StoryObj<typeof HrLayout>;

const children = Array.from({ length: 10 }, (_, i) => (
  <div key={i} className={"p-2"}>
    {i}
  </div>
));

export const Primary: Story = {
  args: {
    hr: <hr className={"my-2 border-gray-200"} />,
    children: children,
  },
};
