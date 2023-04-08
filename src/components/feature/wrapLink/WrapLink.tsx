import Link from "next/link";
import { FC, PropsWithoutRef, ReactNode } from "react";

export type WrapLinkProps = {
  href?: string;
  children: ReactNode;
} & PropsWithoutRef<JSX.IntrinsicElements["a"]>;

//classNameはNext/Linkコンポーネント内部のaタグに付与される

export const WrapLink: FC<WrapLinkProps> = ({ href, children, ...props }) => {
  if (href === undefined) {
    return <a {...props}>{children}</a>;
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};
