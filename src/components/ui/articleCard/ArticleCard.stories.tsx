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

export const Primary: Story = {
  args: {
    className: "w-96",
    date: new Date("2021-01-01"),
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
    title: "News Title",
  },
};
