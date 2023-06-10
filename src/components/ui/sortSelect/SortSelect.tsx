import { ChangeEventHandler, FC, useCallback } from "react";

type SortOptionValue = (typeof options)[number]["value"];

const options = [
  {
    value: "newest",
    label: "新しい順",
  },
  {
    value: "oldest",
    label: "古い順",
  },
] as const;

export type SortSelectProps = {
  value: SortOptionValue;
  onChange: (value: SortOptionValue) => void;
};

export const SortSelect: FC<SortSelectProps> = ({ value, onChange }) => {
  const handleChange = useCallback<ChangeEventHandler<HTMLSelectElement>>(
    (e) => {
      onChange(e.target.value as SortOptionValue);
    },
    [onChange]
  );

  return (
    <select
      value={value}
      onChange={handleChange}
      className={"rounded-lg border border-gray-300 px-2 py-1 text-gray-800"}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
