import { ComponentProps, FC } from "react";

export type IconProps = {
  className?: ComponentProps<"div">["className"];
  fontStyle: "solid" | "brands";
  name: string;
  size?: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
};

export const Icon: FC<IconProps> = ({
  fontStyle,
  name,
  size = "md",
  className,
}) => {
  // eslint-disable-next-line tailwindcss/no-custom-classname
  return <i className={`fa-${fontStyle} fa-${name} fa-${size} ${className}`} />;
};
