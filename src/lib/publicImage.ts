import { CMSImageWithSize } from "@/components/feature/wrapImage";
import CardDefault from "public/card-default.png";
import Logo from "public/logo.png";
import MemberDefault from "public/member-default.png";

export const LogoImg = {
  src: Logo.src,
  width: Logo.width,
  height: Logo.height,
} satisfies CMSImageWithSize;

export const CardDefaultImg = {
  src: CardDefault.src,
  width: CardDefault.width,
  height: CardDefault.height,
} satisfies CMSImageWithSize;

export const MemberDefaultImg = {
  src: MemberDefault.src,
  width: MemberDefault.width,
  height: MemberDefault.height,
} satisfies CMSImageWithSize;
