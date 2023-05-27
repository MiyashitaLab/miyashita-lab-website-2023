import { FC, ReactElement } from "react";

export type ArticleCardDescriptionProps = {
  items: {
    icon: ReactElement;
    text: string;
  }[];
};

export const ArticleCardDescription: FC<ArticleCardDescriptionProps> = ({
  items,
}) => {
  return (
    <table className={"table-auto text-sm text-gray-700"}>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td className={"px-1 py-0.5 align-top"}>{item.icon}</td>
            <td className={"px-1 py-0.5"}>{item.text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
