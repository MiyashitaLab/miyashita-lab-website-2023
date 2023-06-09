import { FC, ReactElement } from "react";

import { Icon } from "@/components/ui/icon";

export type ResearchFilterPanelProps = {
  filterItems: ReactElement[];
  onClickAppend: () => void;
};

export const ResearchFilterPanel: FC<ResearchFilterPanelProps> = ({
  filterItems,
  onClickAppend,
}) => {
  return (
    <div className={"h-full w-full"}>
      <div className={"grid grid-flow-row gap-2"}>
        {filterItems}
        <div className={"flex justify-center"}>
          <button type={"button"} className={"h-8 w-8"} onClick={onClickAppend}>
            <Icon size={"xl"} fontStyle={"solid"} name={"square-plus"} />
          </button>
        </div>
      </div>
    </div>
  );
};
