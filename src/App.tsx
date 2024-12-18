import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import Graph from "./Graphs/Graph";
import useIWHSim from "./Simulation";
import { useState } from "react";

Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  PointElement,
  LineElement,
  Title,
  Legend
);

function App() {
  const [value, setValue] = useState(0);

  const data = useIWHSim({
    Tset: value,
  });

  return (
    <div className="w-full h-screen ">
      {value}
      <input type="range" value={value} onChange={({ target }) => setValue(target.valueAsNumber)} />

      <div className=" flex justify-center">
        <Graph
          chart={{
            options: {
              plugins: {
                title: {
                  display: true,
                  text: "Instantaneous Water Heater",
                },
              },
            },
            type: "line",
            data: {
              labels: data.Time,
              datasets: [
                {
                  backgroundColor: "rgba(255, 0, 0, 0.2)",
                  label: "Water temperature",
                  data: data.Tout,
                },
              ],
            },
          }}
        />
      </div>

      <div className=" flex justify-center">
        <Graph
          chart={{
            type: "line",
            options: {
              plugins: {
                title: {
                  display: true,
                  text: "Instantaneous Water Heater",
                },
              },
            },
            data: {
              labels: data.Time,
              datasets: [
                {
                  backgroundColor: "rgba(0, 255, 0, 0.2)",
                  label: "Control signal",
                  data: data.U,
                },
                {
                  backgroundColor: "rgba(0, 0, 255, 0.2)",
                  label: "Water flow rate",
                  data: data.Qout.map((q) => q * 60 * 1000),
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
