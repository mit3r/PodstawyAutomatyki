import { Chart, ChartConfiguration } from "chart.js";
import { HTMLProps, useEffect, useRef } from "react";

export default function Graph(
  props: HTMLProps<HTMLCanvasElement> & {
    chart: ChartConfiguration;
  }
) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const chart = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvas.current) return () => {};
    if (chart.current) chart.current.destroy();

    chart.current = new Chart(canvas.current, props.chart);
    return () => chart.current && chart.current.destroy();
  }, [props.chart]);

  return <canvas ref={canvas} {...props} />;
}
