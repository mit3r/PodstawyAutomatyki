import Graph from "../Graphs/Graph";
import { Colors } from "./Contants";

export default function WaterTempGraph(props: {
  setTemps: number[];
  temps: number[][];
  time: number[];
}) {
  return (
    <div className="w-1/2 flex justify-center">
      <Graph
        chart={{
          options: {
            animation: false,
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
                  minRotation: 0,
                  maxRotation: 0,
                  stepSize: 10,
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Temperatura wody [°C]",
                },
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
                    ` ${Math.floor(items[0].parsed.x / 60)} min ${Math.round(
                      items[0].parsed.x % 60
                    )} sec`,
                },
              },
            },
          },
          type: "line",
          data: {
            labels: props.time,
            datasets: [
              ...props.temps.map((d, i) => ({
                backgroundColor: Colors[i],
                label: `Symulacja ${i + 1}`,
                data: d,
                fill: false,
                radius: 1,
              })),
              ...props.setTemps.map((d, i) => ({
                borderColor: Colors[i],
                label: `Zadana ${i + 1}`,
                data: props.time.map(() => d),
                fill: false,
                radius: 0,
                borderDash: [5, 5],
              })),
            ],
          },
        }}
      />
    </div>
  );
}
