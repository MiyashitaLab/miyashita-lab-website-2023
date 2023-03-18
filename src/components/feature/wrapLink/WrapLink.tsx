import Link from "next/link";
import { FC, ReactNode } from "react";

export type WrapLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

//classNameはNext/Linkコンポーネント内部のaタグに付与される

export const WrapLink: FC<WrapLinkProps> = ({ href, children, className }) => {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};
