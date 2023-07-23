import { describe, test, expect } from "vitest";

import { digestMarkdown } from "@/lib/digestMarkdown";

describe("digestMarkdown()", () => {
  test("snapshot test", () => {
    const result = digestMarkdown(markdown);

    expect(result).toMatchInlineSnapshot(
      '"H1 文章 H2 文章 H3 文章 H4 文章 新しいポインティング手法を評価する際，実験では通例「できるだけ速く正確に」タスクを行うよう教示する．本稿では複数のバイアスが，既存のポインティング手法であるBubble CursorとBaye"'
    );
  });
});

const markdown = `

# H1
文章

## H2
文章

### H3
文章

#### H4
文章

新しいポインティング手法を評価する際，実験では通例「できるだけ速く正確に」タスクを行うよう教示する．本稿では複数のバイアスが，既存のポインティング手法であるBubble CursorとBayesian Touch Criterionの評価結果に与える影響を検証した．結果，前者は全バイアス条件でベースライン手法の性能を上回ったが，後者はより単純なターゲット予測手法の性能も下回り，元の論文とは異なる結果となった．このように複数のバイアスを調査することで，手法の特性をより正確に議論し，一般化可能性の高い結論を得ることができる．本稿では複数の主観的なバイアスを実験条件に加えることが望ましいと提言する．

1行目
2行目
3行目

1行目 with スペース  
2行目 with スペース  
3行目 with スペース  

---

**Bold**

*Italic*  

++Underline++

~~Break~~

---

> Quote

aaa \`oneline code\` aaa

\`\`\`
codeblock
codeblock
\`\`\`

列挙

- AAA
- BBB
- CCC
  - ccc
- DDD

ああああ


順序列挙
1. 壱
2. 弐
3. 参


| Head | Head | Head | Head |
| --- | --- | --- | --- |
| Data | Data | Data | Data |
| Data | Data | Data | Data |
| Data | Data | Data | Data |

| Head | Head | AAAAAAAAAAA | AAAAAAAAAAA | AAAAAAAAAAA | AAAAAAAAAAA | AAAAAAAAAAA | AAAAAAAAAAA |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Data | Data | Data | Data | Data | Data | Data | Data |
| Data | Data | Data | Data | Data | Data | Data | Data |
| Data | Data | Data | Data | Data | Data | Data | Data |

---

[Google](https://www.google.com/)

[news](/news)

https://www.google.com/
https://www.yahoo.co.jp/


![img_3333.jpg](https://storage.googleapis.com/p_63d9f067f1e6e8f6fa5c3acc/edc2e76b-0a37-45a4-932e-a9db5881bd90%2Fimg_3333.jpg)
*Caption*
*Caption2*

あああ
![img_3333.jpg](https://storage.googleapis.com/p_63d9f067f1e6e8f6fa5c3acc/edc2e76b-0a37-45a4-932e-a9db5881bd90%2Fimg_3333.jpg)
いいいい

段落を分ければ*大丈夫*

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/m_Xsv6GISBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

---

<div>
InDivTag
<h1>HTML H1</h1>
</div>

`;
