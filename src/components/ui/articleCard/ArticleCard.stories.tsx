import { StoryObj } from "@storybook/react";

import { ArticleCard } from "./ArticleCard";

import { WrapImage } from "@/components/feature/wrapImage";
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
        <WrapImage
          src="./card-default.png"
          alt={"test image"}
          originalWidth={800}
          originalHeight={450}
          sizes={{
            base: "100vw",
          }}
          container
          className={"aspect-[1.91/1] w-full"}
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
        <WrapImage
          src="./story/960x540.png"
          alt={"test image"}
          originalWidth={960}
          originalHeight={540}
          sizes={{
            base: "100vw",
          }}
          container
          className={"aspect-[1.91/1] w-full"}
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
        <WrapImage
          src="./story/400x400.png"
          alt={"test image"}
          originalWidth={400}
          originalHeight={400}
          sizes={{
            base: "100vw",
          }}
          container
          className={"aspect-[1.91/1] w-full"}
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
