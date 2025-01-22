import Graph from "../Graphs/Graph";
import { Colors, ColorsDark } from "./Contants";

export default function WaterTempGraph(props: {
  flows: number[][];
  signals: number[][];
  time: number[];
}) {
  return (
    <div className="w-1/2 flex justify-center">
      <Graph
        chart={{
          type: "line",
          options: {
            scales: {
              x: {
                display: true,
                type: "linear",
                min: 0,
                max: Math.max(...props.time),

                ticks: {
                  stepSize: 10,
                },
              },
              y: {
                type: "linear",
                stack: "demo",
                min: 0,
                max: 10,
                ticks: { stepSize: 1 },
                border: { color: "rgba(128, 128,128, 1)", width: 3 },
                offset: true,
              },
              y1: {
                min: 1,
                max: 5,
                ticks: { stepSize: 0.5 },
                type: "linear",
                stack: "demo",
                offset: true,
                border: { color: "rgba(0, 0, 255, 1)" },
              },
            },
            plugins: {
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  title: () => "",
                  label: (item) => {
                    if (Math.floor(item.datasetIndex / props.signals.length))
                      return ` ${item.parsed.y.toFixed(2)} [l/min]`;
                    else return ` ${item.parsed.y.toFixed(2)} [V]`;
                  },
                  footer: (items) =>
                    ` ${Math.floor(items[0].parsed.x / 60)} min ${items[0].parsed.x % 60} sec`,
                },
              },
            },
          },
          data: {
            labels: props.time,
            datasets: [
              ...props.flows.map((d, i) => ({
                backgroundColor: Colors[i],
                label: "Przepływ wody [l/min]",
                data: d,
                yAxisID: "y1",
              })),

              ...props.signals.map((s, i) => ({
                backgroundColor: ColorsDark[i],
                label: "Sygnał sterujący zaworem [V]",
                data: s,
              })),
            ],
          },
        }}
      />
    </div>
  );
}
