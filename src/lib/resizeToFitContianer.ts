export const resizeToFitContainer = ({
  maxWidth,
  maxHeight,
  width,
  height,
}: {
  maxWidth: number;
  maxHeight: number;
  width: number;
  height: number;
}): {
  width: number;
  height: number;
} => {
  const containerAspectRatio = maxWidth / maxHeight;
  const imageAspectRatio = width / height;

  if (containerAspectRatio > imageAspectRatio) {
    return {
      width: maxHeight * imageAspectRatio,
      height: maxHeight,
    };
  } else {
    return {
      width: maxWidth,
      height: maxWidth / imageAspectRatio,
    };
  }
};
