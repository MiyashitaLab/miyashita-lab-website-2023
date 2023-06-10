import Image from "next/image";
import { CSSProperties, FC } from "react";

export type CMSImage = {
  src: string;
};

export type WrapImageProps = CMSImage &
  WrapImageBaseProps &
  (WrapImageSizeSpecifiedProps | WrapImageContainerProps);

export type WrapImageBaseProps = {
  alt: string;
  priority?: boolean;
};

export type WrapImageSizeSpecifiedProps = {
  className?: string;
  width: number;
  height: number;
};

export type WrapImageContainerProps = {
  sizes: {
    base: Exclude<CSSProperties["width"], undefined>;
    sm?: CSSProperties["width"]; // 640pxまで
    md?: CSSProperties["width"]; // 768pxまで
    lg?: CSSProperties["width"]; // 1024pxまで
    xl?: CSSProperties["width"]; // 1280pxまで
  };
};

export const WrapImage: FC<WrapImageProps> = ({
  src,
  alt,
  priority,
  ...rest
}) => {
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

    return (
      <div
        className={"relative flex h-full w-full items-center justify-center"}
      >
        <Image
          src={src}
          alt={alt}
          priority={priority}
          fill
          sizes={sizes}
          className={"object-contain"}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      className={rest.className}
      width={rest.width}
      height={rest.height}
    />
  );
};
