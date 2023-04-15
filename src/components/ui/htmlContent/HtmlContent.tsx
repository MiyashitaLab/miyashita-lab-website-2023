import parse, {
  HTMLReactParserOptions,
  domToReact,
  DOMNode,
  Element,
  attributesToProps,
} from "html-react-parser";
import Image from "next/image";
import { FC } from "react";
import sanitizeHtml, { IOptions } from "sanitize-html";

import { WrapLink } from "@/components/feature/wrapLink";

export type HtmlContentProps = {
  content: string;
};

export const HtmlContent: FC<HtmlContentProps> = ({ content }) => {
  return (
    <div className={"max-w-lg bg-stone-50 p-2"}>{transformHtml(content)}</div>
  );
};

const transformHtml = (htmlText: string) => {
  const sanitized = sanitizeHtml(htmlText, sanitizeOptions);
  return parse(sanitized, parseOptions);
};

// Youtubeなどの埋め込みを許可するためにiframeを許可する
// 検討の結果、ホスト名を制限することはしていない
const sanitizeOptions: IOptions = {
  allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "iframe"],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    iframe: [
      "width",
      "height",
      "src",
      "title",
      "frameborder",
      "allow",
      "allowfullscreen",
    ],
  },
};

const parseOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (isElement(domNode)) {
      const children = domToReact(domNode.children, parseOptions);
      switch (domNode.name) {
        case "strong":
          return <strong className={"font-bold"}>{children}</strong>;
        case "em":
          // 画像の下のemはキャプションとして扱う
          return (
            <em
              className={
                "italic peer-data-[label=img-container]:block peer-data-[label=img-container]:text-center peer-data-[label=img-container]:text-sm"
              }
            >
              {children}
            </em>
          );
        case "u":
          return <u className={"underline"}>{children}</u>;
        case "s":
          return <s className={"line-through decoration-2"}>{children}</s>;
        case "code":
          return (
            <code className={"rounded-md bg-gray-200 box-decoration-clone p-1"}>
              {children}
            </code>
          );
        case "a":
          // 外部リンクもnext/linkでラップしてしまうが問題無いはず
          return <WrapLink href={domNode.attribs.href}>{children}</WrapLink>;

        case "h1":
          return <h1 className={"text-4xl"}>{children}</h1>;
        case "h2":
          return <h2 className={"text-3xl"}>{children}</h2>;
        case "h3":
          return <h3 className={"text-2xl"}>{children}</h3>;
        case "h4":
          return <h3 className={"text-xl"}>{children}</h3>;

        case "p":
          return <p className={"my-2 text-base"}>{children}</p>;
        case "blockquote":
          return (
            <blockquote
              className={
                "my-2 border-l-4 border-gray-300 bg-gray-100 py-1 pl-2 italic"
              }
            >
              {children}
            </blockquote>
          );
        case "pre":
          return (
            <pre className={"my-4 rounded-md bg-gray-200 p-2"}>{children}</pre>
          );

        case "ul":
          return <ul className={"my-4 list-disc"}>{children}</ul>;
        case "ol":
          return <ol className={"my-4 list-decimal"}>{children}</ol>;
        case "li":
          //list-insideを使う場合は点と文字の間隔はブラウザ固定っぽい
          return <li className={"list-item list-inside"}>{children}</li>;

        case "table":
          return (
            <div className={"mb-2 mt-4 overflow-x-auto pb-2"}>
              <table className={"text-left text-sm"}>{children}</table>
            </div>
          );
        case "thead":
          return <thead className={"bg-gray-100"}>{children}</thead>;
        case "tbody":
          return <tbody className={""}>{children}</tbody>;
        case "tr":
          return (
            <tr className={"border-b border-gray-200 last:border-b-0"}>
              {children}
            </tr>
          );
        case "th":
          return <th className={"px-3 py-2"}>{children}</th>;
        case "td":
          return <td className={"px-3 py-2"}>{children}</td>;

        case "hr":
          return <hr className={"my-4 h-px border-gray-300"} />;
        case "br":
          // 画像とキャプションの間のbrは非表示
          // 同じ段落内ならbrは非表示になるが、仕様とする
          return <br className={"peer-data-[label=img-container]:hidden"} />;
        case "img":
          // クリックで拡大モーダル表示しても良いかも
          return (
            <div
              className={"peer relative my-2 h-60 max-w-full"}
              data-label={"img-container"}
            >
              <Image
                className={"object-contain"}
                src={domNode.attribs.src}
                alt={domNode.attribs.alt}
                fill
              />
            </div>
          );

        case "iframe":
          return (
            <div className={"flex justify-center"}>
              <iframe {...attributesToProps(domNode.attribs)}>
                {children}
              </iframe>
            </div>
          );
      }
    }
  },
};

// the workaround: https://github.com/remarkablemark/html-react-parser/issues/616
// the bug: https://github.com/remarkablemark/html-react-parser/issues/633
const isElement = (domNode: DOMNode): domNode is Element => {
  const isTag = ["tag", "script"].includes(domNode.type);
  const hasAttributes = (domNode as Element).attribs !== undefined;

  return isTag && hasAttributes;
};
