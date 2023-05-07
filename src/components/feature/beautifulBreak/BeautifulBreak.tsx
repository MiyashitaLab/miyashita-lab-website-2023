import { loadDefaultJapaneseParser } from "budoux";
import { FC, Fragment } from "react";

export type BeautifulBreakProps = {
  children: string;
  /**
   * word: Intl.Segmenterによる単語単位の分割
   * sentence: Budouxによるもう少し長い単位での分割
   * 1行あたりの文字数が多い場合はsentenceを使うと良い
   * @default word
   */
  segmenter?: "word" | "sentence";
};

//遅延ロードにした方がいいかも
const jpParser = loadDefaultJapaneseParser();

// Intl.Segmenterを使うと単語単位で分割できるが、活用形が分割されてしまうことがある
const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "word" });

const segment = (segmenter: "word" | "sentence", text: string) => {
  if (segmenter === "word") {
    return Array.from(segmenterJa.segment(text)).map(
      (segment) => segment.segment
    );
  } else {
    return jpParser.parse(text);
  }
};

export const BeautifulBreak: FC<BeautifulBreakProps> = ({
  children,
  segmenter = "word",
}) => {
  const [head, ...rest] = segment(segmenter, children);

  return (
    <span className={"break-keep"}>
      {head}
      {rest.map((unit, i) => (
        <Fragment key={`${unit}-${i}`}>
          <wbr />
          {unit}
        </Fragment>
      ))}
    </span>
  );
};
