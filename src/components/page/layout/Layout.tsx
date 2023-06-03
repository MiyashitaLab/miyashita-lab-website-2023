import { FC, ReactNode } from "react";

import { WrapImage } from "@/components/feature/wrapImage";
import { PageFooter } from "@/components/ui/pageFooter";
import { PageHeader } from "@/components/ui/pageHeader";

export type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
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
          links={[
            {
              text: "Home",
              href: "/",
              highlight: true,
            },
            {
              text: "紹介",
              href: "/about",
            },
            {
              text: "ニュース",
              href: "/news",
            },
            {
              text: "論文リポジトリ",
              href: "/researches",
            },
            {
              text: "プロジェクト",
              href: "/projects",
            },
            {
              text: "メンバー",
              href: "/members",
            },
          ]}
        />
      </div>
      <main className={"mx-auto max-w-screen-xl flex-auto pt-12"}>
        {children}
      </main>
      <PageFooter
        copyright={"© 2023 Miyashita Lab"}
        links={[
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
        ]}
      />
    </div>
  );
};
