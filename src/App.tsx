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
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import { useState } from "react";
import ControlSignalGraph from "./Components/ControlSignalGraph";
import RegulationParams from "./Components/RegulationParams";
import WaterTempGraph from "./Components/WaterTempGraph";
import useIWHSim, { IWHSimParams, IWHSimResults } from "./Simulation";
import SimulationParams from "./Components/SimulationParams";
import LoadSavePanel from "./Components/LoadSavePanel";

Chart.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Legend
);

Chart.defaults.scales.linear.ticks.minRotation = 0;
Chart.defaults.scales.linear.ticks.maxRotation = 0;

function App() {
  const [params, setParams] = useState<Partial<IWHSimParams>>({
    Tset: 36,
    Pmax: 7500,
    V: 1,
    Kp: 0.1,
    Tp: 1,
    Ti: 10, //500
    Q: 3 / 60 / 1000,
    Tin: 15,
  });

  const dispatch = <N extends keyof IWHSimParams>(name: N, value: number) =>
    setParams((s) => ({ ...s, [name]: value }));

  const data = useIWHSim({
    ...params,
    V: (params.V ?? 0) / 1000, // liters to cubic meters
  });

  const [graphs, setGraphs] = useState<IWHSimResults[]>([]);
  const saveGraph = () => {
    if (graphs.length >= 3) return;
    setGraphs((s) => [...s, data]);
  };
  const deleteGraph = (index: number) => setGraphs((s) => s.filter((_, i) => i !== index));

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <h1 className="text-3xl text-center p-4 w-full">Symulacja przepływowego podgrzewacza wody</h1>
      <div className="flex gap-4 p-4 flex-wrap">
        <SimulationParams dispatch={dispatch} params={params} />
        <RegulationParams dispatch={dispatch} params={params} />
        <LoadSavePanel graphs={graphs.length} saveGraph={saveGraph} deleteGraph={deleteGraph} />
      </div>

      <div className="flex border-2 p-4 h-full">
        <WaterTempGraph temps={[data.Tout, ...graphs.map((v) => v.Tout)]} time={data.Time} />
        <ControlSignalGraph
          flows={[...graphs.map((v) => v.Qout), data.Qout]}
          signals={[...graphs.map((v) => v.U), data.U]}
          time={data.Time}
        />
      </div>
    </div>
  );
}

export default App;
