export const paginateWithFrame = ({
  firstPage = 1,
  lastPage,
  currentPage,
  halfFrameSize,
  omissionSymbol = "...",
}: {
  firstPage?: number;
  lastPage: number;
  currentPage: number;
  halfFrameSize: number;
  omissionSymbol?: string;
}): (number | string)[] => {
  const frameSize = halfFrameSize * 2 + 1;

  // ページ数がフレームサイズ以下の場合
  if (lastPage - firstPage + 1 <= frameSize) {
    return sequenceNumber(firstPage, lastPage);
  }

  // 1~currentPageまでに省略が入らない場合
  if (currentPage <= halfFrameSize) {
    return [
      ...sequenceNumber(firstPage, firstPage + frameSize - 3),
      omissionSymbol,
      lastPage,
    ];
  }

  // currentPage~lastPageまでに省略が入らない場合
  if (currentPage >= lastPage - halfFrameSize) {
    return [
      firstPage,
      omissionSymbol,
      ...sequenceNumber(lastPage - frameSize + 3, lastPage),
    ];
  }

  return [
    firstPage,
    omissionSymbol,
    ...sequenceNumber(
      currentPage - (halfFrameSize - 2),
      currentPage + (halfFrameSize - 2)
    ),
    omissionSymbol,
    lastPage,
  ];
};

export const sequenceNumber = (first: number, last: number) => {
  return Array.from(Array(last - first + 1)).map((_, i) => i + first);
};
