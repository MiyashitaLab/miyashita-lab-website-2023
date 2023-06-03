import { StoryObj } from "@storybook/react";

import { Article } from "./Article";

import { Layout } from "src/components/page/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Article> = {
  title: "Pages/Article",
  component: Article,
};

export default meta;

type Story = StoryObj<typeof Article>;

export const News: Story = {
  args: {
    title: "インタラクション2023に参加しました",
    type: "news",
    date: new Date("2023-03-28"),
    content: `2023年3月1日～3日にで開催されたインタラクション2023に参加しました！

宮下研からは4件の発表が行われました（B3デモx1、B4デモx1、M1登壇x1、M2デモx1）`,
  },
  render: (args) => (
    <Layout>
      <Article {...args} />
    </Layout>
  ),
};

export const Project: Story = {
  args: {
    title: "Thickness Control Technique",
    type: "project",
    content: `
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/fL9W5oxfj3g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    
We present a printing technique that controls the thickness of objects by increasing and decreasing the amount of material extruded during printing. Using this technique, printers can dynamically control thickness and output thicker objects without a staircase effect. This technique allows users to print aesthetic pattern sheets and objects that are tactile without requiring any new hardware. This extends the capabilities of fused deposition modeling (FDM) 3D printers in a simple way. We describe a method of generating and calculating a movement path for printing tactile sheets, and demonstrate the usage and processing of example objects.

- Haruki Takahashi and Homei Miyashita. Thickness Control Technique for Printing Tactile Sheets with Fused Deposition Modeling, In Adjunct Proc. of UIST’16, pp.51-53, 2016.
`,
  },
  render: (args) => (
    <Layout>
      <Article {...args} />
    </Layout>
  ),
};
