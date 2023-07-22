// クライアント側でNEXT_PUBLICのついていない環境変数を読み取るとエラーになってしまうので、environments.tsとは分けている

export const NEXT_PUBLIC_DISABLE_PROJECTS =
  process.env["NEXT_PUBLIC_DISABLE_PROJECTS"] === "true";
