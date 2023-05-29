import { StoryObj } from "@storybook/react";

import { Research } from "./Research";

import { Layout } from "@/components/ui/layout";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Research> = {
  title: "PAGES/Research",
  component: Research,
};

export default meta;

type Story = StoryObj<typeof Research>;

export const Primary: Story = {
  args: {
    title: "ノッチの左右でワープするカーソルの効果の検証",
    abstract:
      "MacBook Pro（2021）画面上部のノッチ領域にカーソルが進入した場合，カーソルの一部や全体が隠れてしまう．この影響でノッチが操作時間を増加させることを著者らは先行研究で明らかにした．本稿では，ノッチの左右でワープするカーソルを用いることで，ターゲットまでの経路を短縮し，ノッチが増加させる操作時間を抑制できないか検証した．また，ノッチにカーソルの全体が隠れない，デフォルトサイズの 2 倍のカーソルとの比較も行った．結果，ノッチの左右でワープするカーソルの有効性は示されず，デフォルトサイズの 2 倍のカーソルを用いることが操作時間の観点において望ましいことがわかった．",
    authorList: [
      {
        name: "大塲 洋介",
        thumbnail: {
          src: "./temp/author-default.png",
          originalWidth: 300,
          originalHeight: 300,
        },
      },
      {
        name: "宮下 芳明",
        thumbnail: {
          src: "./temp/author-default.png",
          originalWidth: 300,
          originalHeight: 300,
        },
      },
    ],
    paperType: {
      en: "Report",
      ja: "予稿集",
    },
    keywords: ["ノッチ", "カーソル", "ワープ"],
    publicationInfo: {
      publishUrl: "http://id.nii.ac.jp/1001/00223213/",
      date: new Date("2023-01-09"),
      journalTitle: "研究報告ヒューマンコンピュータインタラクション（HCI）",
      volume: "2023-HCI-201",
      issue: "11",
      pages: "1-8",
      copyrightHolder: "情報処理学会",
      quotation:
        "大塲洋介，宮下芳明．ノッチの左右でワープするカーソルの効果の検証，研究報告ヒューマンコンピュータインタラクション（HCI），Vol.2023-HCI-201，Issue.11，pp.1-8，2023．",
    },
    pdfUrl: "http://id.nii.ac.jp/1001/00223213/",
    hero: {
      type: "slide",
      slidePdfUrl:
        "https://downloads.ctfassets.net/jb98px4a3r2v/3qmD3GMMSFJYYdKBBRzUtX/99f8d3e9b073f453e67c6459811dc7c2/hci201-230116003808-1b702961__1_.pdf",
    },
  },
  render: (args) => (
    <Layout>
      <Research {...args} />
    </Layout>
  ),
};
