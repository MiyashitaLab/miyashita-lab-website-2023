import classNames from "classnames";
import Image from "next/image";
import { CSSProperties, FC } from "react";

import { resizeToFitContainer } from "@/lib/resizeToFitContianer";

export type CMSImage = {
  src: string;
  originalWidth: number;
  originalHeight: number;
};

export type WrapImageProps = (CMSImage & {
  alt: string;
  className?: string;
}) &
  (
    | {
        maxWidth: number;
        maxHeight: number;
      }
    | {
        sizes: {
          base: Exclude<CSSProperties["width"], undefined>;
          sm?: CSSProperties["width"]; // 640pxまで
          md?: CSSProperties["width"]; // 768pxまで
          lg?: CSSProperties["width"]; // 1024pxまで
          xl?: CSSProperties["width"]; // 1280pxまで
        };
        container?: boolean;
      }
  );

export const WrapImage: FC<WrapImageProps> = ({
  src,
  alt,
  originalWidth,
  originalHeight,
  ...rest
}) => {
  //TODO この辺もう少し整理したい
  // コンポーネント分けちゃった方がいいかも

  if ("sizes" in rest) {
    const { base, sm, md, lg, xl } = rest.sizes;
    const sizes = [
      { minWidth: 1280, size: xl },
      { minWidth: 1024, size: lg },
      { minWidth: 768, size: md },
      { minWidth: 640, size: sm },
    ]
      .filter(({ size }) => size !== undefined)
      .map(({ minWidth, size }) => `(min-width: ${minWidth}) ${size}`)
      .concat(`${base}`)
      .join(", ");

    if (rest.container === true) {
      return (
        <div className={classNames(rest.className, "relative")}>
          <Image
            src={src}
            alt={alt}
            fill
            className={"object-contain"}
            sizes={sizes}
          />
        </div>
      );
    }

    return (
      <Image
        className={rest.className}
        src={src}
        alt={alt}
        width={originalWidth}
        height={originalHeight}
        sizes={sizes}
      />
    );
  }

  const { maxWidth, maxHeight } = rest;
  const { width, height } = resizeToFitContainer({
    maxWidth,
    maxHeight,
    width: originalWidth,
    height: originalHeight,
  });
  return (
    <Image
      className={rest.className}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};
