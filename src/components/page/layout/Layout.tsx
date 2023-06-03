import { useRouter } from "next/router";
import { FC, ReactNode, useMemo } from "react";

import { WrapImage } from "@/components/feature/wrapImage";
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
    text: "Research DB",
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
};

export const Layout: FC<LayoutProps> = ({ children, currentTopPath }) => {
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

  return (
    <div className={"flex h-full flex-col bg-stone-50"}>
      <div className={"fixed top-0 z-50 h-12 w-full"}>
        <PageHeader
          className={"shadow"}
          logo={
            <WrapImage
              src={"./logo.png"}
              alt={"Miyashita Lab"}
              originalWidth={831}
              originalHeight={175}
              maxWidth={152}
              maxHeight={32}
            />
          }
          logoHref={"#home"}
          links={links}
        />
      </div>
      <main className={"mx-auto w-full max-w-screen-xl flex-auto pt-12"}>
        {children}
      </main>
      <PageFooter copyright={"© 2023 Miyashita Lab"} links={footerLinks} />
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
