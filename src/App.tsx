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
import { useCallback, useReducer, useState } from "react";
import ControlSignalGraph from "./Components/ControlSignalGraph";
import LoadSavePanel from "./Components/LoadSavePanel";
import RegulationParams from "./Components/RegulationParams";
import SimulationParams from "./Components/SimulationParams";
import WaterTempGraph from "./Components/WaterTempGraph";
import { GraphsSavingReducer } from "./Reducer";
import useIWHSim, { IWHSimParams } from "./Simulation";

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
  // Manage simulation parameters
  const [params, setParams] = useState<Partial<IWHSimParams>>({
    Tset: 36,
    Pmax: 7500,
    V: 1,
    Kp: 0.1,
    Tp: 0.25,
    Ti: 10, //500
    Q: 3 / 60 / 1000,
    Tin: 10,
  });

  const dispatchParams = <N extends keyof IWHSimParams>(name: N, value: number) =>
    setParams((s) => ({ ...s, [name]: value }));

  // Simulate with parameters
  const data = useIWHSim({
    ...params,
    V: (params.V ?? 0) / 1000, // liters to cubic meters
  });

  // Manage saved graphs
  // const [graphs, setGraphs] = useState<IWHSimResults[]>([]);
  // const saveGraph = () => {
  //   if (graphs.length >= 3) return;
  //   setGraphs((s) => [...s, data]);
  // };
  // const deleteGraph = (index: number) => setGraphs((s) => s.filter((_, i) => i !== index));

  const [graphs, setGraphs] = useReducer(GraphsSavingReducer, []);
  const saveGraph = useCallback(() => setGraphs({ type: "save", payload: data }), [data]);
  const deleteGraph = (id: number) => setGraphs({ type: "delete", payload: id });

  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <h1 className="text-3xl text-center p-4 w-full">Symulacja przepływowego podgrzewacza wody</h1>
      <div className="flex gap-4 p-4 flex-wrap">
        <SimulationParams dispatch={dispatchParams} params={params} />
        <RegulationParams dispatch={dispatchParams} params={params} />
        <LoadSavePanel graphs={graphs} saveGraph={saveGraph} deleteGraph={deleteGraph} />
      </div>

      <div className="flex border-2 p-4 h-full">
        <WaterTempGraph temps={[data.Tout, ...graphs.map((v) => v.Tout)]} time={data.Time} />
        <ControlSignalGraph signals={[data.U, ...graphs.map((v) => v.U)]} time={data.Time} />
      </div>
    </div>
  );
}

export default App;
