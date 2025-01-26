import Graph from "../Graphs/Graph";
import { ColorsDark } from "./Contants";

export default function WaterTempGraph(props: { signals: number[][]; time: number[] }) {
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
                offset: true,
              },
            },
            plugins: {
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  title: () => "",
                  label: (item) => ` ${item.parsed.y.toFixed(2)} [V]`,
                  footer: (items) =>
                    ` ${Math.floor(items[0].parsed.x / 60)} min ${Math.round(
                      items[0].parsed.x % 60
                    )} sec`,
                },
              },
            },
          },
          data: {
            labels: props.time,
            datasets: [
              ...props.signals.map((s, i) => ({
                backgroundColor: ColorsDark[i],
                label: `Sygnał sterujący ${i + 1} [V]`,
                data: s,
                radius: 1,
              })),
            ],
          },
        }}
      />
    </div>
  );
}
