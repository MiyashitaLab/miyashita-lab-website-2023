//半角文字
const halfWidthChars = /[ -~]/;

/**
 * 半角文字は1、全角文字は2として文字数をカウントする
 * @param text
 */
export const textWidth = (text: string): number => {
  return Array.from(text)
    .map((char) => {
      if (char.match(halfWidthChars)) return 1;
      return 2;
    })
    .reduce((acc, width) => acc + width, 0);
};
