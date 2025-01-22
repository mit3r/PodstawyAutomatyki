export default function SelectInput(props: {
  values: number[];
  value: number;
  onChange(value: number): void;
}) {
  return (
    <div className="flex gap-2">
      {props.values.map((value) => {
        const choosen = props.value === value;
        return (
          <button
            key={value}
            className={`px-2 py-1 w-full  rounded-lg hover:bg-slate-400 transition-colors ${
              choosen ? "bg-slate-600 text-white" : "bg-slate-200 text-slate-600"
            }`}
            onClick={() => props.onChange(value)}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}
