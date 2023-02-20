---
to: src/components/page/<%= h.changeCase.camel(name) %>/<%= h.changeCase.pascal(name) %>.stories.tsx
---

import { StoryObj } from "@storybook/react";

import { <%= h.changeCase.pascal(name) %> } from "./<%= h.changeCase.pascal(name) %>";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof <%= h.changeCase.pascal(name) %>> = {
  title: "<%= h.changeCase.pascal(name) %>",
  component: <%= h.changeCase.pascal(name) %>,
};

export default meta;

type Story = StoryObj<typeof <%= h.changeCase.pascal(name) %>>;

export const Primary: Story = {
  args: {
    //write your args here
  },
};
