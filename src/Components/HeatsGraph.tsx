import Graph from "../Graphs/Graph";
import { ColorsDark } from "./Contants";

export default function HeatsGraph(props: {
  heatIn: number[][];
  heatOut: number[][];
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
                title: {
                  display: true,
                  text: "Czas [s]",
                },
                display: true,
                type: "linear",
                min: 0,
                max: Math.max(...props.time),

                ticks: {
                  stepSize: 10,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Energia [J]",
                },
                type: "linear",
                stack: "demo",
                // min: 0,
                // max: 10,
                // ticks: { stepSize: 1 },
                offset: true,
              },
            },
            plugins: {
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  title: () => "",
                  label: (item) =>
                    `${item.datasetIndex % 2 ? "-" : ""} ${item.parsed.y.toFixed(2)} [J]`,
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
              ...props.heatIn
                .map((s, i) => [
                  {
                    backgroundColor: ColorsDark[i],
                    label: `Symulacja ${i + 1} - energia dodana`,
                    data: s,
                    radius: 1,
                  },
                  {
                    borderColor: ColorsDark[i],
                    label: `Symulacja ${i + 1} - energia stracona`,
                    data: props.heatOut[i],
                    radius: 0,
                    fill: false,
                    borderDash: [5, 5],
                  },
                ])
                .flat(),
              // ...props.heatOut.map((s, i) => ({
              //   borderColor: ColorsDark[i],
              //   label: `Symulacja ${i + 1} - energia stracona`,
              //   data: s,
              //   radius: 0,
              //   fill: false,
              //   borderDash: [5, 5],
              // })),
            ],
          },
        }}
      />
    </div>
  );
}
