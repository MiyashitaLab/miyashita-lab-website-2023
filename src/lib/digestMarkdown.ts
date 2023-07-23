import { Content, Parent, Root } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

const processor = unified().use(remarkParse).use(remarkGfm);

/**
 * OGPのdescriptionに使うために、Markdownをプレーンテキストに変換する
 */
export const digestMarkdown = (markdown: string) => {
  const result = extractPlainText(markdown);
  return result
    .map((text) => text.replaceAll("\n", ""))
    .join(" ")
    .slice(0, 120);
};

const extractPlainText = (markdown: string): string[] => {
  const mdast = processor.parse(markdown) as Root;

  const walk = (tree: Parent | Content): string[] => {
    if ("children" in tree) {
      return tree.children.flatMap((child) => walk(child));
    }

    if (tree.type === "text") {
      return [tree.value];
    }

    return [""];
  };

  const result = walk(mdast);
  return result.filter((item) => item !== "");
};
