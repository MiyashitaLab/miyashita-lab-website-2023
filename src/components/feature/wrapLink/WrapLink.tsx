import Link from "next/link";
import { FC, ReactNode } from "react";

export type WrapLinkProps = {
  href: string;
  children: ReactNode;
};

export const WrapLink: FC<WrapLinkProps> = ({ href, children }) => {
  return <Link href={href}>{children}</Link>;
};
