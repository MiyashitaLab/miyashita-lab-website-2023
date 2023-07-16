import { FC, Fragment } from "react";
import TinySegmenter from "tiny-segmenter";

export type BeautifulBreakProps = {
  children: string;
};

const segmenter = new TinySegmenter();

const segment = (text: string): string[] => {
  return segmenter.segment(text);
};

export const BeautifulBreak: FC<BeautifulBreakProps> = ({ children }) => {
  const [head, ...rest] = segment(children);

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
