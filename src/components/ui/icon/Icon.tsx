import classNames from "classnames";
import { ComponentProps, FC, PropsWithoutRef } from "react";

export type IconProps = {
  className?: ComponentProps<"div">["className"];
  fontStyle: "solid" | "brands";
  name: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
} & PropsWithoutRef<JSX.IntrinsicElements["i"]>;

export const Icon: FC<IconProps> = ({
  fontStyle,
  name,
  size = "md",
  className,
  ...props
}) => {
  // eslint-disable-next-line tailwindcss/no-custom-classname
  return (
    <i
      className={classNames(`fa-${fontStyle} fa-${name} fa-${size}`, className)}
      {...props}
    />
  );
};
