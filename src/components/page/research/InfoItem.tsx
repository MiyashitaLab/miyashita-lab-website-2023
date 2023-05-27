import { FC, ReactNode } from "react";

export type InfoItemProps = {
  label: string;
  children: ReactNode;
};

export const InfoItem: FC<InfoItemProps> = ({ label, children }) => {
  return (
    <p className={"inline-flex"}>
      <span className={"pr-2 font-semibold"}>{label}</span>
      <span>{children}</span>
    </p>
  );
};
