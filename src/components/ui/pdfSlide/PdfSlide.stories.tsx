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
      "https://storage.googleapis.com/miyashita-lab-website-2023-storage-dev/6563387d-7916-4f69-b573-fc6c75f61a8c%2F%E9%B9%BF%E5%B3%B6%2C%E5%8D%92%E8%AB%96%E8%AB%96%E6%96%872022%2C%E3%82%B9%E3%83%A9%E3%82%A4%E3%83%88%E3%82%99.pdf",
  },
};
