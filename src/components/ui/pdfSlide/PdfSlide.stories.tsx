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
      "https://storage.googleapis.com/miyashita-lab-website-2023-storage-dev/83e3404f-b952-4a90-b692-8d6ab26ff08a/hci201-230116003808-1b702961.pdf",
  },
};
