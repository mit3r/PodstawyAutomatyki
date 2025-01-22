// use Instantaneous Water Heater Simulation

import { useMemo } from "react";
import "../utils";

export interface IWHSimParams {
  // Heater parameters
  Qmax: number; // maksymalny przepływ na wejściu [m^3/s] // 5l/min
  Qmin: number; //minimalny przepływ na wejściu [m^3/s]
  Umax: number; // maksymalne napiecie sterujace [V]
  Tin: number; // temperatury wody na wejściu [°C]
  Tset: number; // temperatura zadana [°C]
  P: number; // moc grzałki [W]
  V: number; // 1l, objętość komory grzewczej [m^3]
  Kp: number; // wzmocnienie regulacji
  Ti: number; // czas zdwojenia
  Tp: number; // okres próbkowania [s]
  time: number; // czas symulacji [s]
}

export interface IWHSimResults {
  U: number[]; // control signal [V]
  Tout: number[]; // temperature of water leaving the heater [°C]
  Qout: number[]; // flow rate of water leaving the heater [m^3/s]
  Time: number[]; // time [s]
}

/**
 * useIWHSim
 * @returns array of Tout values
 * @description This hook is used to simulate the Instantaneous Water Heater
 */
export default function useIWHSim({
  Qmax = 5 / 60 / 1000, // maksymalny przepływ na wejściu [m^3/s] // 5l/min
  Qmin = Qmax * 0.2, //minimalny przepływ na wejściu [m^3/s]
  Umax = 10, // maksymalne napiecie sterujace [V]
  Tin = 15, // temperatury wody na wejściu [°C]
  Tset = 38, // temperatura zadana [°C]
  P = 2500, // moc grzałki [W]
  V = 0.001, // 3l, objętość komory grzewczej [m^3]
  Kp = 0.5, // wzmocnienie regulacji
  Ti = 500, // czas zdwojenia
  Tp = 1, // okres próbkowania [s]
  time = 5 * 60, // czas symulacji [s]
}: Partial<IWHSimParams>): IWHSimResults {
  const p = 1000; // density of water [kg/m^3]
  const c = 4186; // heat capacity of water [J/(kg*K)]

  return useMemo<IWHSimResults>(() => {
    const e: number[] = [];
    let sum_e: number = 0;
    const U: number[] = [];
    const Tout: number[] = [Tin];
    const Qout: number[] = [Qmin];
    const Time: number[] = [0];

    // Simulation loop
    for (let n = 0; n < Math.ceil(time / Tp); n += 1) {
      Time[n + 1] = Time[n] + Tp; // Czas symulacji

      // regulator PI
      e[n] = Tset - Tout[n]; // Uchyb w tej chwili
      sum_e += e[n]; // Suma uchybów

      // Wyliczanie sterowania
      const calcU = -Kp * (e[n] + (Tp / Ti) * sum_e);
      U[n] = Math.min(Umax, Math.max(0, calcU)); // ograniczenie sterowania
      // 0 - zawór jest maksymalnie zamknięty; przepływa minimalna ilość wody
      // 10 - zawór jest maksymalnie otwarty; przepływa maksymalna ilość wody

      // Wyliczanie następnego przepływu wody opuszczającej grzałkę
      Qout[n + 1] = Qmin + (Qmax - Qmin) * (U[n] / Umax);
      // console.log((P * V) / (Qout[i] * p * c));

      // Wzór na obliczenie temperatury wody wychodzącej z grzałki
      const tempAdded = (Tset > Tin ? P : 0) / (p * c * V); // energia dodana przez grzałkę
      const tempLost = (Qout[n] / V) * (Tout[n] - Tin); // energia stracona

      Tout[n + 1] = Tout[n] + Tp * (tempAdded - tempLost);
    }

    return { U, Tout, Qout: Qout.map((v) => v * 60 * 1000), Time };
  }, [Qmax, Qmin, Umax, Tin, Tset, P, V, Kp, Ti, Tp, time, p, c]);
}
