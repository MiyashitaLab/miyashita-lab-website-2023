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

export const TheAuthors: Story = {
  args: {
    ...Primary.args,
    copyright: "© The Authors",
  },
};

export const TheAuthorsMobile: Story = {
  ...TheAuthors,
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

// 著作権表示の折り返しを確認するための固定サンプル。
const manyAuthors = [
  { ja: "山中祥太", en: "Shota Yamanaka" },
  { ja: "薄羽大樹", en: "Hiroki Usuba" },
  { ja: "高橋治輝", en: "Haruki Takahashi" },
  { ja: "加藤邦拓", en: "Kunitaku Kato" },
  { ja: "中村裕美", en: "Hiromi Nakamura" },
  { ja: "青山一真", en: "Kazuma Aoyama" },
  { ja: "若林裕太", en: "Yuta Wakabayashi" },
  { ja: "吉川祐輔", en: "Yusuke Yoshikawa" },
  { ja: "大塲洋介", en: "Yosuke Oba" },
  { ja: "宮下芳明", en: "Homei Miyashita" },
];

export const ManyAuthorsJapanese: Story = {
  name: "著者10名・日本語",
  args: {
    ...Primary.args,
    copyright: `© ${manyAuthors.map((author) => author.ja).join(" / ")}`,
  },
};

export const ManyAuthorsEnglish: Story = {
  name: "著者10名・英語",
  args: {
    ...Primary.args,
    copyright: `© ${manyAuthors.map((author) => author.en).join(" / ")}`,
  },
};

export const ManyAuthorsJapaneseMobile: Story = {
  ...ManyAuthorsJapanese,
  name: "著者10名・日本語（モバイル）",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const ManyAuthorsEnglishMobile: Story = {
  ...ManyAuthorsEnglish,
  name: "著者10名・英語（モバイル）",
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
