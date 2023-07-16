import "@/styles/globals.css";

import { Noto_Sans_JP } from "@next/font/google";
import { NextPage } from "next";
import { FC, ReactElement, ReactNode } from "react";

import { Layout } from "src/components/page/layout";

import type { AppProps } from "next/app";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

//normal: 400
//bold: 700
const notoSansJp = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--noto-sans-jp",
  display: "swap",
});

//こっちはstorybookでも読み込まれる
export const AppWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div style={notoSansJp.style} className={"h-full"}>
      {children}
    </div>
  );
};

//ここに書いたものはstorybookでは読み込まれないので注意
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);
  return (
    <AppWrapper>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </AppWrapper>
  );
}
