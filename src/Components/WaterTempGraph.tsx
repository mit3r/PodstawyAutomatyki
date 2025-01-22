import Graph from "../Graphs/Graph";
import { Colors } from "./Contants";

export default function WaterTempGraph(props: { temps: number[][]; time: number[] }) {
  return (
    <div className="w-1/2 flex justify-center">
      <Graph
        chart={{
          options: {
            animation: false,
            scales: {
              x: {
                display: true,
                type: "linear",
                min: 0,
                max: Math.max(...props.time),

                ticks: {
                  minRotation: 0,
                  maxRotation: 0,
                  stepSize: 10,
                },
              },
              y: {
                max: Math.ceil(Math.max(...props.temps.flat(), 51)) + 1,
                ticks: {
                  stepSize: 1,
                },
              },
            },
            plugins: {
              tooltip: {
                enabled: true,
                mode: "index",
                intersect: false,
                titleAlign: "center",
                callbacks: {
                  title: () => "",
                  label: (item) => ` ${item.parsed.y.toFixed(2)}°C`,
                  footer: (items) =>
                    ` ${Math.floor(items[0].parsed.x / 60)} min ${items[0].parsed.x % 60} sec`,
                },
              },
            },
          },
          type: "line",
          data: {
            labels: props.time,
            datasets: props.temps.map((d, i) => ({
              backgroundColor: Colors[i],
              label: "Temperatura wody",
              data: d,
            })),
          },
        }}
      />
    </div>
  );
}
