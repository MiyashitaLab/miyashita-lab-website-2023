import Image from "next/image";
import { CSSProperties, FC } from "react";

import { resizeToFitContainer } from "@/lib/resizeToFitContianer";

export type CMSImage = {
  src: string;
};

export type CMSImageWithSize = CMSImage & {
  width: number;
  height: number;
};

export type SizeSet = {
  base: Exclude<CSSProperties["width"], undefined>; // それ以外のとき
  sm?: CSSProperties["width"]; // 640px以上のとき
  md?: CSSProperties["width"]; // 768px以上のとき
  lg?: CSSProperties["width"]; // 1024px以上のとき
  xl?: CSSProperties["width"]; // 1280px以上のとき
};

export type WrapImageSizedProps = CMSImageWithSize & {
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: SizeSet;
  maxWidth?: number;
  maxHeight?: number;
};

export type WrapImageFillProps = CMSImage & {
  alt: string;
  priority?: boolean;
  sizes: SizeSet;
};

export type WrapImageInlineProps = CMSImage & {
  alt: string;
  priority?: boolean;
  sizes: SizeSet;
};

/**
 * next/imageを使って画像を表示するコンポーネント
 * サイズが固定の場合はこちらを使う
 */
export const WrapImageSized: FC<WrapImageSizedProps> = ({
  src,
  alt,
  priority,
  className,
  width,
  height,
  sizes,
  maxHeight,
  maxWidth,
}) => {
  const sizesSet = sizes && constructSizesSrcSet(sizes);

  if (maxWidth || maxHeight) {
    const limitedSize = resizeToFitContainer({
      maxWidth: maxWidth ?? 99999,
      maxHeight: maxHeight ?? 99999,
      width: width,
      height: height,
    });

    return (
      <Image
        src={src}
        alt={alt}
        priority={priority}
        className={className}
        sizes={sizesSet}
        width={limitedSize.width}
        height={limitedSize.height}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      className={className}
      sizes={sizesSet}
      width={width}
      height={height}
    />
  );
};

/**
 * next/imageを使って画像を表示するコンポーネント
 * サイズが親側で決まっている場合はこれをつかう
 */
export const WrapImageFill: FC<WrapImageFillProps> = ({
  src,
  alt,
  priority,
  sizes,
}) => {
  const sizesSet = constructSizesSrcSet(sizes);

  return (
    <div className={"relative flex h-full w-full items-center justify-center"}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        fill
        sizes={sizesSet}
        className={"object-cover"}
      />
    </div>
  );
};

/**
 * next/imageを使って画像を表示するコンポーネント
 * Markdownの中に入れるときに使う
 */
export const WrapImageInline: FC<WrapImageInlineProps> = ({
  src,
  alt,
  priority,
  sizes,
}) => {
  const sizesSet = constructSizesSrcSet(sizes);

  return (
    <span className={"relative h-full"}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        fill
        sizes={sizesSet}
        className={"!relative max-h-96 object-contain"}
      />
    </span>
  );
};

const constructSizesSrcSet = (
  { base, sm, md, lg, xl }: SizeSet,
  mediaQuery: string = "min-width"
) => {
  return [
    { minWidth: 1280, size: xl },
    { minWidth: 1024, size: lg },
    { minWidth: 768, size: md },
    { minWidth: 640, size: sm },
  ]
    .filter(({ size }) => size !== undefined)
    .map(({ minWidth, size }) => `(${mediaQuery}: ${minWidth}) ${size}`)
    .concat(`${base}`)
    .join(", ");
};
