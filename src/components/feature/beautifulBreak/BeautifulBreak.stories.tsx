import { StoryObj } from "@storybook/react";
import { FC } from "react";

import { BeautifulBreak, BeautifulBreakProps } from "./BeautifulBreak";

import type { Meta } from "@storybook/react";

//シンプルにargsでboxWidthを追加しようとするとTSの型でエラーが出るためこのようにしている

const WrappedComponent: FC<
  BeautifulBreakProps & {
    boxWidth: number;
  }
> = ({ children, boxWidth }) => (
  <div
    style={{
      width: boxWidth,
    }}
    className={"border border-dashed border-gray-500 p-1"}
  >
    <p>
      <BeautifulBreak>{children}</BeautifulBreak>
    </p>
  </div>
);

const meta: Meta<typeof WrappedComponent> = {
  title: "BeautifulBreak",
  component: WrappedComponent,
  argTypes: {
    boxWidth: {
      control: {
        type: "range",
        min: 100,
        max: 1000,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children:
      "ポインティング手法の評価実験における速さと正確さへのバイアスが評価結果に与える影響",
    boxWidth: 500,
  },
};
