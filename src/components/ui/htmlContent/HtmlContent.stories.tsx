import { StoryObj } from "@storybook/react";

import { HtmlContent } from "./HtmlContent";

import type { Meta } from "@storybook/react";

const meta: Meta<typeof HtmlContent> = {
  title: "HtmlContent",
  component: HtmlContent,
};

export default meta;

type Story = StoryObj<typeof HtmlContent>;

const testHtml =
  '<h1>H1</h1>\n<p>文章</p>\n<h2>H2</h2>\n<p>文章</p>\n<h3>H3</h3>\n<p>文章</p>\n<h4>H4</h4>\n<p>文章</p>\n<p>新しいポインティング手法を評価する際，実験では通例「できるだけ速く正確に」タスクを行うよう教示する．本稿では複数のバイアスが，既存のポインティング手法であるBubble CursorとBayesian Touch Criterionの評価結果に与える影響を検証した．結果，前者は全バイアス条件でベースライン手法の性能を上回ったが，後者はより単純なターゲット予測手法の性能も下回り，元の論文とは異なる結果となった．このように複数のバイアスを調査することで，手法の特性をより正確に議論し，一般化可能性の高い結論を得ることができる．本稿では複数の主観的なバイアスを実験条件に加えることが望ましいと提言する．</p>\n<p>1行目<br>\n2行目<br>\n3行目</p>\n<hr>\n<p><strong>Bold</strong></p>\n<p><em>Italic</em></p>\n<p>++Underline++</p>\n<p><s>Break</s></p>\n<hr>\n<blockquote>\n<p>Quote</p>\n</blockquote>\n<p>aaa <code>oneline code</code> aaa</p>\n<pre><code>codeblock\ncodeblock\n</code></pre>\n<p>列挙</p>\n<ul>\n<li>AAA</li>\n<li>BBB</li>\n<li>CCC</li>\n</ul>\n<p>順序列挙</p>\n<ol>\n<li>壱</li>\n<li>弐</li>\n<li>参</li>\n</ol>\n<table>\n<thead>\n<tr>\n<th>Head</th>\n<th>Head</th>\n<th>Head</th>\n<th>Head</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n</tr>\n<tr>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n</tr>\n<tr>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n</tr>\n</tbody>\n</table>\n<table>\n<thead>\n<tr>\n<th>Head</th>\n<th>Head</th>\n<th>AAAAAAAAAAA</th>\n<th>AAAAAAAAAAA</th>\n<th>AAAAAAAAAAA</th>\n<th>AAAAAAAAAAA</th>\n<th>AAAAAAAAAAA</th>\n<th>AAAAAAAAAAA</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n</tr>\n<tr>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n</tr>\n<tr>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n<td>Data</td>\n</tr>\n</tbody>\n</table>\n<hr>\n<p><img src="https://storage.googleapis.com/p_63d9f067f1e6e8f6fa5c3acc/edc2e76b-0a37-45a4-932e-a9db5881bd90%2Fimg_3333.jpg" alt="img_3333.jpg"><br>\n<em>Caption</em><br>\n<em>Caption2</em><br>\n続く文<br>\n続く文の中の<em>italic</em>です</p>\n<p>段落を分ければ<em>大丈夫</em></p>\n<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/m_Xsv6GISBo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>\n<hr>\n<div>\nInDivTag\n<h1>HTML H1</h1>\n</div>\n';

export const Primary: Story = {
  args: {
    content: testHtml,
  },
};
