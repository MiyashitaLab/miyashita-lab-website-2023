import { useRouter } from "next/router";
import { FC, ReactNode, useMemo } from "react";

import { WrapImageSized } from "@/components/feature/wrapImage";
import { PageFooter } from "@/components/ui/pageFooter";
import { PageFooterLinkItem } from "@/components/ui/pageFooter/PageFooter";
import { PageHeader } from "@/components/ui/pageHeader";
import { PageHeaderLinkItem } from "@/components/ui/pageHeader/PageHeader";
import { NEXT_PUBLIC_DISABLE_PROJECTS } from "@/lib/publicEnvironments";
import { LogoImg } from "@/lib/publicImage";
import { ROUTES } from "@/lib/routes";

const headerItems: (PageHeaderLinkItem | undefined)[] = [
  { text: "Home", href: ROUTES.HOME },
  { text: "About", href: ROUTES.ABOUT },
  { text: "News", href: ROUTES.NEWS },
  { text: "Researches", href: ROUTES.RESEARCHES },
  NEXT_PUBLIC_DISABLE_PROJECTS
    ? undefined
    : { text: "Projects", href: ROUTES.PROJECTS },
  { text: "Members", href: ROUTES.MEMBERS },
];

const footerLinks = [
  { text: "Copyright Notice", href: "/copyright" },
  { text: "Privacy Policy", href: "/privacy-policy" },
  { text: "Contact", href: "/about" },
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

  const path = currentTopPath ?? extractTopLevelPathName(router.asPath);

  const links = useMemo<PageHeaderLinkItem[]>(
    () =>
      headerItems
        .filter((item): item is PageHeaderLinkItem => item !== undefined)
        .map((linkItem) => ({
          ...linkItem,
          highlight: path === linkItem.href,
        })),
    [path]
  );

  const copyright = `© ${
    copyrightText ?? `${new Date().getFullYear()} Miyashita Lab`
  }`;

  return (
    <div className={"flex h-full flex-col bg-stone-50"}>
      <div className={"fixed top-0 z-50 h-12 w-full shadow"}>
        <PageHeader
          logo={
            <WrapImageSized
              src={LogoImg.src}
              alt={"Miyashita Lab"}
              priority
              width={152}
              height={32}
            />
          }
          logoHref={"/"}
          links={links}
        />
      </div>
      <main className={"w-full flex-auto bg-stone-50 pt-12"}>
        <div className={"mx-auto max-w-screen-xl"}>{children}</div>
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
