// クライアント側でNEXT_PUBLICのついていない環境変数を読み取るとエラーになってしまうので、environments.tsとは分けている

export const NEXT_PUBLIC_DISABLE_PROJECTS =
  process.env["NEXT_PUBLIC_DISABLE_PROJECTS"] === "true";

export const NEXT_PUBLIC_SITE_TITLE =
  process.env["NEXT_PUBLIC_SITE_TITLE"] ??
  "宮下研究室 - 明治大学 総合数理学部 先端メディアサイエンス学科";

export const NEXT_PUBLIC_VERCEL_URL = process.env["NEXT_PUBLIC_VERCEL_URL"];

export const GOOGLE_ANALYTICS_ID =
  process.env["NEXT_PUBLIC_GOOGLE_ANALYTICS_ID"];
