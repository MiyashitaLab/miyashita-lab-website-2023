import "../src/styles/globals.css";
import { AppWrapper } from "@/pages/_app";

export const parameters = {
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
};

export const decorators = [
  (Story: () => JSX.Element) => (
    <AppWrapper>
      <Story />
    </AppWrapper>
  ),
];
