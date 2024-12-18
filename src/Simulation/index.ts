// use Instantaneous Water Heater Simulation

import { useMemo } from "react";
import "../utils";

interface IWHSimParams {
  // Heater parameters
  Umax: number; // maximum control signal [V]
  Qmax: number; // maximum flow rate of water [m^3/s]
  Qmin: number; // minimum flow rate of water [m^3/s]
  Tin: number; // temperature of water entering the heater [°C]
  P: number; // power of the heater [W]
  V: number; // volume of the heater chamber [m^3]

  // Controller parameters
  Tset: number; // set temperature of the water [°C]
  Kp: number; // proportional gain
  Ki: number; // integral gain

  c: number; // heat capacity of water [J/(kg*K)]

  // Simulation parameters
  dt: number; // time step [s]
  time: number; // simulation time [s]
}

interface IWHSimResults {
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
  //flow in  liters / minutes scaled to m^3/s
  Qmax = 5 / 60 / 1000, // maximum flow rate of water [m^3/s]
  Qmin = Qmax * 0.2, //minimum flow rate of water [m^3/s]
  Umax = 10, // maximum control signal [V]
  Tin = 20, // temperature of water entering the heater [°C]
  Tset = 38, // set temperature of the water [°C]
  P = 2000, // power of the heater [W]
  V = 0.001, // 1l, volume of the heater chamber [m^3]
  Kp: Tp = -0.004, // proportional gain
  Ki: Ti = -0.000001, // integral gain
  dt = 0.5, // time step [s]
  time = 10 * 60, // simulation time [s]
}: Partial<IWHSimParams>): IWHSimResults {
  const p = 1000; // density of water [kg/m^3]
  const c = 4186; // heat capacity of water [J/(kg*K)]

  return useMemo<IWHSimResults>(() => {
    const e: number[] = [0];
    const I: number[] = [0];
    const U: number[] = [0];
    const Tout: number[] = [Tin];
    const Qout: number[] = [Qmin];
    const Time: number[] = [0];

    // Simulation loop
    for (let i = 0; i < Math.ceil(time / dt); i += 1) {
      Time[i + 1] = Time[i] + dt;

      // Calculate error
      e[i + 1] = Tset - Tout[i];

      // Calculate integral of error
      I[i + 1] = I[i] + e[i] * dt;

      // Calculate control signal
      const U_ = U[i] + Tp * e[i] + Ti * I[i];
      U[i + 1] = Math.min(Umax, Math.max(0, U_));
      // 0 - valve is minimaly open
      // 10 - valve is maximaly open

      // Calculate flow rate of water leaving the heater
      Qout[i + 1] = Qmin + (Qmax - Qmin) * (U[i + 1] / Umax);
      // console.log((P * V) / (Qout[i] * p * c));
      // Calculate heat transfer rate

      const tempAdded = P / (p * c * V); // energia dodana przez grzałkę
      const tempLost = (Qout[i] / V) * (Tout[i] - Tin); // energia stracona

      Tout[i + 1] = Tout[i] + dt * (tempAdded - tempLost);
    }

    return { U, Tout, Qout, Time };
  }, [Qmax, Qmin, Umax, Tin, Tset, P, V, Tp, Ti, dt, time]);
}
