import "@/styles/globals.css";

import type { AppProps } from "next/app";

//ここに書いたものはstorybookでは読み込まれないので注意

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
