import "../src/styles/globals.css";
import { AppWrapper } from "@/pages/_app";
import { Preview } from "@storybook/react";

export const parameters: Preview["parameters"] = {
  backgrounds: {
    default: "light",
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
};

export const decorators: Preview["decorators"] = [
  (Story: () => JSX.Element) => (
    <AppWrapper>
      <Story />
    </AppWrapper>
  ),
];
