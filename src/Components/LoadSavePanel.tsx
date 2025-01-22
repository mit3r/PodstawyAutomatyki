import { Colors } from "./Contants";

export default function LoadSavePanel(props: {
  graphs: number;
  saveGraph: () => void;
  deleteGraph: (index: number) => void;
}) {
  return (
    <div className="border-2 border-black p-2 flex-grow">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="text-left pb-2">Zapis</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td className="w-full flex items-center gap-x-1">
              <div
                className="aspect-square h-4"
                style={{
                  backgroundColor: Colors[0],
                }}
              ></div>
              Symulacja
            </td>
            {/* <td>
                <button
                  className="text-white bg-slate-600 px-2 py-1 w-20 rounded-md"
                  onClick={() => props.deleteGraph(i)}
                >
                  Usuń
                </button>
              </td> */}
          </tr>

          {Array.from({ length: props.graphs }, (_, i) => (
            <tr key={i}>
              <td className="w-full flex items-center gap-x-1">
                <div
                  className="aspect-square h-4"
                  style={{
                    backgroundColor: Colors[i + 1],
                  }}
                ></div>
                Symulacja {i + 1}
              </td>
              <td>
                <button
                  className="text-white bg-slate-600 px-2 py-0.5 w-20 rounded-md"
                  onClick={() => props.deleteGraph(i)}
                >
                  Usuń
                </button>
              </td>
            </tr>
          ))}

          <tr>
            <td></td>
            <td>
              <button
                className="text-white bg-slate-600 px-2 py-0.5 rounded-md w-20"
                onClick={props.saveGraph}
              >
                Dodaj
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
