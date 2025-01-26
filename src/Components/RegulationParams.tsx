import { IWHSimParams } from "../Simulation";
import SliderInput from "../Inputs/SliderInput";

const variables: Partial<Record<keyof IWHSimParams, number[]>> = {
  Kp: [0.01, 0.1, 0.5, 1, 2, 5, 10], // Wzmocnienie
  Ti: [0.25, 0.5, 1, 2, 5, 10, 50, 100, 500, 1000], // Czas zdwojenia
  Tp: [0.125, 0.25, 0.5, 1, 5], // Okres próbkowania
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
