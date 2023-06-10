import { FC } from "react";

import { CMSImage, WrapImage } from "@/components/feature/wrapImage/WrapImage";
import { PdfSlide } from "@/components/ui/pdfSlide";

export type HeroType =
  | {
      type: "image";
      image: CMSImage;
    }
  | {
      type: "youtube";
      youtubeUrl: string;
    }
  | {
      type: "slide";
      slidePdfUrl: string;
    };

export type ResearchHeroProps = {
  hero: HeroType;
};

export const ResearchHero: FC<ResearchHeroProps> = ({ hero }) => {
  if (hero.type === "image") {
    return (
      <div className={"aspect-[1.91/1] max-h-96 w-full bg-stone-100"}>
        <WrapImage
          className={"mx-auto"}
          src={hero.image.src}
          sizes={{
            base: "100vw",
          }}
          alt={""}
        />
      </div>
    );
  }

  if (hero.type === "youtube") {
    const youtubeId = new URL(hero.youtubeUrl).searchParams.get("v");
    if (youtubeId === null) return <></>;

    //TODO widget_referrerを設定する
    return (
      <div className={"w-full bg-stone-100"}>
        <div className={"relative mx-auto aspect-video w-full max-w-[682px]"}>
          <iframe
            className={"absolute left-0 top-0 h-full w-full"}
            width={560}
            height={315}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?modestbranding=1&rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (hero.type === "slide") {
    return (
      <div className={"bg-gray-100"}>
        <PdfSlide width={"full"} height={384} pdfUrl={hero.slidePdfUrl} />
      </div>
    );
  }

  return <></>;
};
