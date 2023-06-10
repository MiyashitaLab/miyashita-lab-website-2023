import { StoryObj } from "@storybook/react";

import { ResearchHero } from "./ResearchHero";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof ResearchHero> = {
  title: "Pages/Research/ResearchHero",
  component: ResearchHero,
};

export default meta;

type Story = StoryObj<typeof ResearchHero>;

export const Image: Story = {
  args: {
    hero: {
      type: "image",
      image: {
        src: "./card-default.png",
        width: 1200,
        height: 630,
      },
    },
  },
};

export const Youtube: Story = {
  args: {
    hero: {
      type: "youtube",
      youtubeUrl: "https://www.youtube.com/watch?v=m_Xsv6GISBo",
    },
  },
};

export const Slide: Story = {
  args: {
    hero: {
      type: "slide",
      slidePdfUrl:
        "https://downloads.ctfassets.net/jb98px4a3r2v/3qmD3GMMSFJYYdKBBRzUtX/99f8d3e9b073f453e67c6459811dc7c2/hci201-230116003808-1b702961__1_.pdf",
    },
  },
};
