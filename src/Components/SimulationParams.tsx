import { IWHSimParams } from "../Simulation";
import SliderInput from "../Inputs/SliderInput";
import NoInput from "../Inputs/NoInput";

const variables: Partial<Record<keyof IWHSimParams, number[]>> = {
  Tset: new Array(31).fill(0).map((_, i) => 10 + i), // Temperatura zadana
  Pmax: [2500, 5000, 7500], // Moc grzałki
  V: [1, 2, 3], // Pojemność komory grzewczej
};

type VariableName = keyof IWHSimParams;

export default function RegulationParams(props: {
  params: Partial<IWHSimParams>;
  dispatch: (name: VariableName, value: number) => void;
}) {
  return (
    <div className="border-2 border-black p-2 flex-grow">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-left pb-2">Parametry symulacji</th>
          </tr>
        </thead>
        <tbody>
          {(
            [
              ["Tin", "Temperatura wejściowa", "°C", (v: number) => v],
              ["Q", "Przepływ", " l/min", (v: number) => v * 60 * 1000],
              ["Pmax", "Moc grzałki", "W", (v: number) => v],
              ["V", "Pojemnść komory grzewczej", "l", (v: number) => v],
            ] as const
          ).map(([name, label, postfix, conv]) => (
            <tr key={label}>
              <td className="px-2 text-nowrap">{label}</td>
              <td className="px-2 ">
                <NoInput value={conv(props.params[name as VariableName] ?? 0)} postfix={postfix} />
              </td>
            </tr>
          ))}

          {/* {[
            // ["Pmax", "Moc grzałki", "W"],
            // ["V", "Pojemnść komory grzewczej", "l"],
          ].map(([name, label, postfix]) => (
            <tr key={name}>
              <td className="px-2 text-nowrap">{label}</td>
              <td className="px-2">
                <SliderInput
                  onChange={(v) => props.dispatch(name as VariableName, v)}
                  value={props.params[name as VariableName] ?? 0}
                  values={variables[name as VariableName] ?? []}
                  postfix={postfix}
                />
              </td>
            </tr>
          ))} */}

          <tr>
            <td className="px-2 text-nowrap">Temperatura zadana</td>

            <td className="px-2">
              <SliderInput
                onChange={(v) => props.dispatch("Tset", v)}
                value={props.params.Tset ?? 0}
                values={variables.Tset ?? []}
                postfix="°C"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
