import { StoryObj } from "@storybook/react";
import Image from "next/image";

import { ArticleCard } from "./ArticleCard";

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
    url: "#",
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
    url: "#",
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
    title:
      "オープンラボ・全方位進路相談会開催します！（2022年度）オープンラボ・全方位進路相談会開催します！（2022年度）",
  },
};
