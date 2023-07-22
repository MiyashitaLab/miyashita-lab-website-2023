import { describe, test, expect } from "vitest";

import { digestMarkdown } from "@/lib/digestMarkdown";

describe("digestMarkdown()", () => {
  test("プレーンテキストのみを抽出する", () => {
    const markdownText = `
# タイトル

これは *Markdown* 形式の **テキスト**です。
[リンク1](https://example.com)が含まれます。

https://example.com/page

- リスト項目1
- リスト項目2

> 引用文もあります。

段落です。

## サブタイトル

別の段落です。
`;

    const plainText = digestMarkdown(markdownText);

    expect(plainText).not.toMatch("#");
    expect(plainText).not.toMatch("*");
    expect(plainText).not.toMatch("https://example.com");
  });
});
