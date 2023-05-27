import classNames from "classnames";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import { BeautifulBreak } from "@/components/feature/beautifulBreak";
import { WrapLink } from "@/components/feature/wrapLink";
import { AuthorTag } from "@/components/page/research/AuthorTag";
import { InfoItem } from "@/components/page/research/InfoItem";
import { Icon } from "@/components/ui/icon";

export type ResearchProps = {
  //write your props here
};

export const Research: FC<ResearchProps> = ({}) => {
  const [showCite, setShowCite] = useState(false);

  const citeContainerRef = useRef<HTMLDivElement>(null);
  const citeTextareaRef = useRef<HTMLTextAreaElement>(null);
  const citeInfoRef = useRef<HTMLDivElement>(null);

  const toggleCite = useCallback(() => {
    if (showCite) {
      setShowCite(false);
    } else {
      const height = citeInfoRef.current?.getBoundingClientRect().height;
      console.log(height);
      citeContainerRef.current?.style.setProperty(
        "--cite-info-height",
        `${height}px`
      );
      setShowCite(true);
    }
  }, [showCite]);

  useEffect(() => {
    citeTextareaRef.current?.select();
  }, [showCite]);

  return (
    <div>
      {/* TODO HERO */}
      <div className={"mx-4"}>
        <div className={"font-semibold"}>
          <span lang={"ja"}>研究報告</span>
          <span lang={"en"} className={"pl-2"}>
            Conference Proceedings
          </span>
        </div>
        <h1 className={"py-2 text-3xl font-semibold"}>
          <BeautifulBreak segmenter={"word"}>
            ノッチの左右でワープするカーソルの効果の検証
          </BeautifulBreak>
        </h1>

        <div className={"flex py-2"}>
          <div className={"flex flex-1 gap-2"}>
            <AuthorTag
              name={"大塲 洋介"}
              thumbnail={{
                src: "/temp/author-default.png",
                originalWidth: 300,
                originalHeight: 300,
              }}
            />
            <AuthorTag
              name={"宮下 芳明"}
              thumbnail={{
                src: "/temp/author-default.png",
                originalWidth: 300,
                originalHeight: 300,
              }}
            />
          </div>
          <div className={"flex flex-none items-start pl-4"}>
            <button className={"h-8 rounded bg-red-700 px-2 text-gray-100"}>
              <Icon className={"p-1"} fontStyle={"solid"} name={"file-lines"} />
              <span className={"px-1"}>PDF</span>
            </button>
          </div>
        </div>

        <hr className={"my-2 border-gray-200"} />

        <div className={"flex"}>
          <div
            ref={citeContainerRef}
            className={classNames("flex-1 h-[--cite-info-height]", {
              hidden: !showCite,
            })}
          >
            <textarea
              ref={citeTextareaRef}
              className={"h-full w-full resize-none border-0 bg-transparent"}
              readOnly
              value={
                "大塲洋介，宮下芳明．ノッチの左右でワープするカーソルの効果の検証，研究報告ヒューマンコンピュータインタラクション（HCI），Vol.2023-HCI-201，Issue.11，pp.1-8，2023．"
              }
            />
          </div>
          <div
            className={classNames("flex-1", {
              hidden: showCite,
            })}
            ref={citeInfoRef}
          >
            <InfoItem label={"Journal: "}>
              <span>研究報告ヒューマンコンピュータインタラクション（HCI）</span>
            </InfoItem>
            <div className={"flex flex-col gap-x-4 sm:flex-row sm:flex-wrap"}>
              <InfoItem label={"Volume:"}>2023-HCI-201</InfoItem>
              <InfoItem label={"Issue:"}>11</InfoItem>
              <InfoItem label={"Pages:"}>1-8</InfoItem>
            </div>
            <InfoItem label={"Source URL:"}>
              <WrapLink href={"http://id.nii.ac.jp/1001/00223213/"}>
                <span className={"text-blue-800"}>
                  http://id.nii.ac.jp/1001/00223213/
                </span>
              </WrapLink>
            </InfoItem>
          </div>

          <div className={"flex flex-none items-start pl-4"}>
            <button
              onClick={toggleCite}
              className={"h-8 w-8 rounded bg-stone-200"}
            >
              <Icon fontStyle={"solid"} name={"quote-right"} />
            </button>
          </div>
        </div>

        <hr className={"my-2 border-gray-200"} />

        <InfoItem label={"Published:"}>
          <time>2023-01-09</time>
        </InfoItem>

        <hr className={"my-2 border-gray-200"} />

        <InfoItem label={"Keywords:"}>
          {[
            "keyword1",
            "keyword2",
            "keyword1",
            "keyword2",
            "keyword1",
            "keyword2",
            "keyword1",
            "keyword2",
          ].join(" / ")}
        </InfoItem>

        <hr className={"my-2 border-gray-200"} />

        <section>
          <h2 className={"py-2 text-2xl font-semibold"}>Abstract</h2>
          <p>
            <BeautifulBreak segmenter={"sentence"}>
              MacBook
              Pro（2021）画面上部のノッチ領域にカーソルが進入した場合，カーソルの一部や全体が隠れてしまう．この影響でノッチが操作時間を増加させることを著者らは先行研究で明らかにした．本稿では，ノッチの左右でワープするカーソルを用いることで，ターゲットまでの経路を短縮し，ノッチが増加させる操作時間を抑制できないか検証した．また，ノッチにカーソルの全体が隠れない，デフォルトサイズの
              2
              倍のカーソルとの比較も行った．結果，ノッチの左右でワープするカーソルの有効性は示されず，デフォルトサイズの
              2
              倍のカーソルを用いることが操作時間の観点において望ましいことがわかった．
            </BeautifulBreak>
          </p>
        </section>
      </div>
    </div>
  );
};
