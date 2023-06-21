import { faker } from "@faker-js/faker";
import { StoryObj } from "@storybook/react";

import { Top } from "./Top";

import {
  memberModelMock,
  newsModelMock,
  paperModelMock,
  projectModelMock,
} from "@/models/mockData";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof Top> = {
  title: "Pages/Top",
  component: Top,
};

export default meta;

type Story = StoryObj<typeof Top>;

export const Primary = {
  args: {
    top: {
      topImg: {
        src: "./story/homeHero.png",
        width: 1280,
        height: 360,
      },
      title: "宮下研究室",
      description:
        "宮下研究室では、音楽・映像・3DCGアニメーション、3Dプリンタ、ゲームやVR、プログラミングも味覚も全て「表現」であると捉え、人間の表現能力を拡張する「インストゥルメント」として、コンピュータのあり方を考えています。",
    },
    newsList: faker.helpers.multiple(() => newsModelMock(faker), { count: 8 }),
    researchList: faker.helpers.multiple(() => paperModelMock(faker), {
      count: 8,
    }),
    projectList: faker.helpers.multiple(() => projectModelMock(faker), {
      count: 8,
    }),
    memberList: faker.helpers.multiple(() => memberModelMock(faker), {
      count: 12,
    }),
  },
} satisfies Story;
