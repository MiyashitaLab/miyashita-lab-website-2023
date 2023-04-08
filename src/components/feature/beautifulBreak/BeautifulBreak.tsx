import { loadDefaultJapaneseParser } from "budoux";
import { FC, Fragment } from "react";

export type BeautifulBreakProps = {
  children: string;
};

const jpParser = loadDefaultJapaneseParser();

// Intl.Segmenterを使うと単語単位で分割できるが、活用形が分割されてしまうことがある
const segmenterJa = new Intl.Segmenter("ja-JP", { granularity: "word" });

export const BeautifulBreak: FC<BeautifulBreakProps> = ({ children }) => {
  const [head, ...rest] = jpParser.parse(children);
  // const [head, ...rest] = Array.from(segmenterJa.segment(children)).map(
  //   (segment) => segment.segment
  // );

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
