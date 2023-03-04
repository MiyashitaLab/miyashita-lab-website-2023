import { loadDefaultJapaneseParser } from "budoux";
import { FC } from "react";

export type BeautifulBreakProps = {
  children: string;
};

const jpParser = loadDefaultJapaneseParser();

export const BeautifulBreak: FC<BeautifulBreakProps> = ({ children }) => {
  const [head, ...rest] = jpParser.parse(children);
  return (
    <span className={"break-keep"}>
      {head}
      {rest.map((unit) => (
        <>
          <wbr />
          {unit}
        </>
      ))}
    </span>
  );
};
