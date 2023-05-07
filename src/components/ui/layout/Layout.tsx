import Image from "next/image";
import { FC, ReactNode } from "react";

import { PageFooter } from "@/components/ui/pageFooter";
import { PageHeader } from "@/components/ui/pageHeader";

export type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  //TODO 画像は仮で入れてある
  return (
    <div>
      <div className={"fixed top-0 z-50 h-12 w-full shadow"}>
        <PageHeader
          logo={
            <Image
              src={"/temp/logo.png"}
              alt={"Miyashita Lab Logo"}
              width={152}
              height={32}
            />
          }
          logoHref={"#home"}
          links={[
            {
              text: "ホーム",
              href: "#home",
              highlight: true,
            },
            {
              text: "紹介",
              href: "#about",
            },
            {
              text: "ニュース",
              href: "#news",
            },
            {
              text: "論文リポジトリ",
              href: "#paper",
            },
            {
              text: "プロジェクト",
              href: "#project",
            },
            {
              text: "メンバー",
              href: "#member",
            },
          ]}
        />
      </div>
      <main className={"mx-auto max-w-screen-xl pt-12"}>{children}</main>
      <PageFooter
        copyright={"© 2023 Miyashita Lab"}
        links={[
          {
            text: "Copyright Notice",
            href: "#",
          },
          {
            text: "Privacy Policy",
            href: "#",
          },
          {
            text: "Contact",
            href: "#",
          },
        ]}
      />
    </div>
  );
};