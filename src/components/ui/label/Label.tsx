import classNames from "classnames";
import { ComponentProps, FC, ReactNode } from "react";

export type LabelProps = {
  className?: ComponentProps<"div">["className"];
  children?: ReactNode;
};

export const Label: FC<LabelProps> = ({ children, className }) => {
  return (
    <span
      className={classNames(
        "text-xs inline-block py-0.5 px-1.5 rounded text-gray-100",
        className
      )}
    >
      {children}
    </span>
  );
};
