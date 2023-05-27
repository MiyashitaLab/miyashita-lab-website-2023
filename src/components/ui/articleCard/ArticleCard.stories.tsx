import { StoryObj } from "@storybook/react";
import Image from "next/image";

import { ArticleCard } from "./ArticleCard";

import { ArticleCardDescription } from "@/components/ui/articleCardDescription";
import { Icon } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ArticleCard> = {
  title: "ArticleCard",
  component: ArticleCard,
};

export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Basic: Story = {
  args: {
    className: "w-96",
    date: new Date("2021-01-01"),
    href: "#",
    children: (
      <>
        <Image
          src="https://raw.githubusercontent.com/MiyashitaLab/miyashita.com/master/public/assets/images/noimage.png"
          alt={"test image"}
          width={384}
          height={216}
        />
      </>
    ),
    title: "News Title",
  },
};

export const LongTitle: Story = {
  args: {
    className: "w-96",
    date: new Date("2021-12-31"),
    href: "#",
    children: (
      <>
        <Image
          src="https://i.gyazo.com/fb446d3a093d2916907e1ee38ab7907a.png"
          alt={"test image"}
          width={384}
          height={216}
        />
      </>
    ),
    title: "オープンラボ・全方位進路相談会を開催します！（2022年度）",
  },
};

export const Research: Story = {
  args: {
    className: "w-96",
    date: new Date("2021-12-31"),
    href: "#",
    children: (
      <>
        <Image
          src="https://i.gyazo.com/fb446d3a093d2916907e1ee38ab7907a.png"
          alt={"test image"}
          width={384}
          height={216}
        />
      </>
    ),
    title: "オープンラボ・全方位進路相談会を開催します！（2022年度）",
    label: <Label className={"bg-cyan-700"}>研究報告</Label>,
    description: (
      <ArticleCardDescription
        items={[
          {
            icon: <Icon fontStyle={"solid"} name={"user"} />,
            text: "Alice / Bob / Carol",
          },
          {
            icon: <Icon fontStyle={"solid"} name={"book"} />,
            text: "なんとか処理学会",
          },
        ]}
      />
    ),
  },
};
