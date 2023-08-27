import { FC, Fragment, ReactElement, ReactNode } from "react";

export type HrLayoutProps = {
  children: ReactNode[];
  hr: ReactElement;
};

/**
 * 与えられたchildrenの間にhrを挟む
 * @param children
 * @param hr hrの要素
 */
export const HrLayout: FC<HrLayoutProps> = ({ children, hr }) => {
  const validChildren = children.filter(
    (child) => child !== null && child !== undefined
  );

  return (
    <>
      {validChildren.map((child, index) => (
        <Fragment key={index}>
          {child}
          {index !== validChildren.length - 1 && hr}
        </Fragment>
      ))}
    </>
  );
};
