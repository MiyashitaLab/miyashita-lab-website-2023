import { StoryObj } from "@storybook/react";
import Image from "next/image";

import { PageHeader } from "./PageHeader";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof PageHeader> = {
  title: "PageHeader",
  component: PageHeader,
};

export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Primary: Story = {
  args: {
    className: "h-12",
    logo: (
      <Image
        src={"./temp/logo.png"}
        alt={"Miyashita Lab Logo"}
        width={152}
        height={32}
      />
    ),
    logoHref: "#home",
    links: [
      {
        text: "ホーム",
        href: "#home",
      },
      {
        text: "紹介",
        href: "#about",
        highlight: true,
      },
      {
        text: "ニュース",
        href: "#news",
      },
      {
        text: "論文リポジトリ",
        href: "#paper",
      },
      {
        text: "プロジェクト",
        href: "#project",
      },
      {
        text: "メンバー",
        href: "#member",
      },
    ],
  },
};
