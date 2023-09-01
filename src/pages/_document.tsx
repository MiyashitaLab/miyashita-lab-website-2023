import { Html, Head, Main, NextScript } from "next/document";

import { Analytics } from "@/components/feature/analytics";

//ここに書いたものはstorybookでは読み込まれないので注意

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Analytics />
      </body>
    </Html>
  );
}
