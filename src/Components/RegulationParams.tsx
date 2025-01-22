import { IWHSimParams } from "../Simulation";
import SliderInput from "../Inputs/SliderInput";

const variables: Partial<Record<keyof IWHSimParams, number[]>> = {
  Tset: new Array(36).fill(0).map((_, i) => 19 + i), // Temperatura zadana
  P: [1500, 2000, 2500], // Moc grzałki
  V: [1, 2, 3], // Pojemność komory grzewczej
  Kp: [0.1, 0.5, 1, 2, 5, 10], // Wzmocnienie
  Tp: [1, 5, 10, 20, 50], // Okres próbkowania
  Ti: [2, 5, 10, 50, 100, 500, 1000], // Czas zdwojenia
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
            <th className="text-left pb-2">Parametry regulatora</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Kp", "Wzmocnienie", ""],
            ["Ti", "Czas zdwojenia", ""],
            ["Tp", "Okres próbkowania", ""],
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
