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
      <div className={"bg-stone-100"}>
        <WrapImage
          className={"mx-auto"}
          src={hero.image.src}
          originalWidth={hero.image.originalWidth}
          originalHeight={hero.image.originalHeight}
          maxHeight={384}
          maxWidth={9999}
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
      <div className={"bg-stone-100"}>
        <iframe
          className={"mx-auto"}
          width="682"
          height="384"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?modestbranding=1&rel=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
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
