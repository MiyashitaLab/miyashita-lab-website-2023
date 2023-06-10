import { useRouter } from "next/router";
import { FC, ReactNode, useMemo } from "react";

import { WrapImageSized } from "@/components/feature/wrapImage";
import { PageFooter } from "@/components/ui/pageFooter";
import { PageFooterLinkItem } from "@/components/ui/pageFooter/PageFooter";
import { PageHeader } from "@/components/ui/pageHeader";
import { PageHeaderLinkItem } from "@/components/ui/pageHeader/PageHeader";

const headerItems = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "About",
    href: "/about",
  },
  {
    text: "News",
    href: "/news",
  },
  {
    text: "Researches",
    href: "/researches",
  },
  {
    text: "Projects",
    href: "/projects",
  },
  {
    text: "Members",
    href: "/members",
  },
] as const satisfies readonly PageHeaderLinkItem[];

const footerLinks = [
  {
    text: "Copyright Notice",
    href: "/copyright",
  },
  {
    text: "Privacy Policy",
    href: "/privacy",
  },
  {
    text: "Contact",
    href: "/contact",
  },
] as const satisfies readonly PageFooterLinkItem[];

export type LayoutProps = {
  children: ReactNode;
  currentTopPath?: string;
  copyrightText?: string;
};

export const Layout: FC<LayoutProps> = ({
  children,
  currentTopPath,
  copyrightText,
}) => {
  const router = useRouter();

  const pathname = currentTopPath ?? extractTopLevelPathName(router.pathname);

  const links = useMemo<PageHeaderLinkItem[]>(
    () =>
      headerItems.map((linkItem) => ({
        ...linkItem,
        highlight: pathname === linkItem.href,
      })),
    [pathname]
  );

  const copyright = `© ${
    copyrightText ?? `${new Date().getFullYear()} Miyashita Lab`
  }`;

  return (
    <div className={"flex h-full flex-col bg-stone-50"}>
      <div className={"fixed top-0 z-50 h-12 w-full"}>
        <PageHeader
          className={"shadow"}
          logo={
            <WrapImageSized
              src={"./logo.png"}
              alt={"Miyashita Lab"}
              priority
              width={152}
              height={32}
            />
          }
          logoHref={"#home"}
          links={links}
        />
      </div>
      <main
        className={"mx-auto w-full max-w-screen-xl flex-auto bg-stone-50 pt-12"}
      >
        {children}
      </main>
      <div className={"w-full"}>
        <PageFooter copyright={copyright} links={footerLinks} />
      </div>
    </div>
  );
};

const extractTopLevelPathName = (pathname: string) => {
  const segments = pathname.split("/");
  if (segments.length > 1) {
    return `/${segments[1]}`;
  } else {
    return pathname;
  }
};
