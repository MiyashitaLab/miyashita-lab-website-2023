import Link from "next/link";
import { FC, PropsWithoutRef, ReactNode } from "react";

export type WrapLinkProps = {
  href?: string | undefined | null;
  children: ReactNode;
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["a"]>, "href">;

//classNameはNext/Linkコンポーネント内部のaタグに付与される

export const WrapLink: FC<WrapLinkProps> = ({ href, children, ...props }) => {
  if (!href) {
    return <a {...props}>{children}</a>;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
