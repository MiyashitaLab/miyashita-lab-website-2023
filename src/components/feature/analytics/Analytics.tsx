import Script from "next/script";
import { FC } from "react";

import { GOOGLE_ANALYTICS_ID } from "@/lib/publicEnvironments";

/**
 * Analytics関連のスクリプトを読み込む
 */
export const Analytics: FC = () => {
  //本番環境以外では読み込まない
  if (process.env.NODE_ENV !== "production") {
    return <></>;
  }

  if (!GOOGLE_ANALYTICS_ID) {
    console.warn("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID is not defined.");
    return <></>;
  }

  return (
    <>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${GOOGLE_ANALYTICS_ID}');
        `}
      </Script>
    </>
  );
};
