/**
 * OGPのdescriptionに使うために、Markdownをプレーンテキストに変換する
 */
export const digestMarkdown = (markdown: string): string => {
  const lines = markdown.split("\n");

  return lines
    .map((line) => {
      const plainTextRegex = /[^#*_\-+\d\s`>\[\]!]+/g;
      const matches = line.match(plainTextRegex);

      if (!matches) {
        return "";
      }

      const filteredMatches = matches.map((span) => {
        const urlRegex =
          /(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\/\s]*)*/g;
        const urlWithParentheses =
          /\((https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/[^\/\s]*)*\)/g;

        return span.replace(urlWithParentheses, "").replace(urlRegex, "");
      });
      return filteredMatches.join("");
    })
    .filter((line) => line !== "")
    .join(" ");
};
