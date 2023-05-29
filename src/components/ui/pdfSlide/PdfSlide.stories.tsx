import { StoryObj } from "@storybook/react";

import { PdfSlide } from "@/components/ui/pdfSlide/PdfSlide";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof PdfSlide> = {
  title: "PdfSlide",
  component: PdfSlide,
};

export default meta;

type Story = StoryObj<typeof PdfSlide>;

export const Primary: Story = {
  args: {
    pdfUrl:
      "https://downloads.ctfassets.net/jb98px4a3r2v/3qmD3GMMSFJYYdKBBRzUtX/99f8d3e9b073f453e67c6459811dc7c2/hci201-230116003808-1b702961__1_.pdf",
  },
};
