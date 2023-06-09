import { ChangeEventHandler, useCallback } from "react";

import { Icon } from "@/components/ui/icon";

export type ResearchFilterItemProps<T> = {
  typeOptions: readonly {
    value: T;
    label: string;
  }[];
  text: string;
  type: T;
  onChangeText: (text: string) => void;
  onChangeType: (type: T) => void;
  onClickDelete: () => void;
};

export const ResearchFilterItem = <T extends string>({
  typeOptions,
  text,
  type,
  onChangeText,
  onChangeType,
  onClickDelete,
}: ResearchFilterItemProps<T>): JSX.Element => {
  const handleSelectChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      onChangeType(e.target.value as T);
    },
    [onChangeType]
  );

  const handleTextChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      onChangeText(e.target.value);
    },
    [onChangeText]
  );

  return (
    <div className={"grid h-full w-full grid-cols-[1fr_max-content] gap-2"}>
      <div className={"grid grid-cols-[max-content_1fr]"}>
        <select
          value={type}
          onChange={handleSelectChange}
          className={"rounded-l-lg border border-gray-300 p-1 text-gray-800"}
        >
          {typeOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className={"rounded-r-lg border border-gray-300 p-1 text-gray-800"}
        />
      </div>
      <button className={"p-2"} onClick={onClickDelete}>
        <Icon fontStyle={"solid"} name={"xmark"} />
      </button>
    </div>
  );
};