import "@/styles/globals.css";

import { Noto_Sans_JP } from "@next/font/google";
import { FC, ReactNode } from "react";

import type { AppProps } from "next/app";

//ここに書いたものはstorybookでは読み込まれないので注意

//normal: 400
//bold: 700
const notoSansJp = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--noto-sans-jp",
  display: "swap",
});

export const AppWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={notoSansJp.className}>{children}</div>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
