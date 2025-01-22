import { useCallback, useState } from "react";

export default function SliderInput(props: {
  value: number;
  onChange(value: number): void;
  values: number[];
  postfix?: string;
}) {
  const [id, setValue] = useState(props.values.indexOf(props.value));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newId = isNaN(e.target.valueAsNumber) ? 0 : e.target.valueAsNumber;

      setValue(newId);
      props.onChange(props.values[newId]);
    },
    [props]
  );

  return (
    <div className="flex gap-x-3">
      <span className="text-center rounded-md min-w-20 w-[15%] px-2 border-2">
        {props.values[id]}
        {props.postfix}
      </span>

      <input
        className="w-full min-w-28"
        type="range"
        min={0}
        max={props.values.length - 1}
        step={1}
        value={id}
        onChange={handleChange}
      />
    </div>
  );
}
