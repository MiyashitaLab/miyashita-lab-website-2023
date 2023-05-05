import Image from "next/image";
import { FC } from "react";

export type WrapImageProps = {
  src: string;
  alt: string;
  originalWidth: number;
  originalHeight: number;
  maxWidth: number;
  maxHeight: number;
};

export const WrapImage: FC<WrapImageProps> = ({
  src,
  alt,
  originalWidth,
  originalHeight,
  maxWidth,
  maxHeight,
}) => {
  const { width, height } = calcImgSize(
    maxWidth,
    maxHeight,
    originalWidth,
    originalHeight
  );
  return <Image src={src} alt={alt} width={width} height={height} />;
};

const calcImgSize = (
  maxWidth: number,
  maxHeight: number,
  width: number,
  height: number
) => {
  //縦が収まるように縮小したときの横幅
  const widthByHeight = (maxHeight * width) / height;
  //横が収まるように縮小したときの縦幅
  const heightByWidth = (maxWidth * height) / width;

  if (widthByHeight > maxWidth) {
    //縦が収まるようにしたら横がはみ出た場合、横が収まるようにする
    return {
      width: maxWidth,
      height: heightByWidth,
    };
  } else {
    //縦が収まるようにしても横がはみ出なかった場合、その値を採用
    return {
      width: widthByHeight,
      height: maxHeight,
    };
  }
};
