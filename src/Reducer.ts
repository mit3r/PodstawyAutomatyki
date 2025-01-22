export interface Params {
  power: 1500 | 2000 | 2500; // [W]
  volume: 1 | 2 | 3; // [l]
  time: 3 | 5; // [min]
  setTemp: number; // [°C]
  Kp: 0.1 | 0.5 | 1 | 2;
  Tp: 1 | 10 | 20 | 30; // [s]
  Ti: 100 | 500 | 1000; // [s]
}

export function parametersReducer<S extends Params, A extends keyof S>(
  state: S,
  action: { type: A; value: S[A] }
) {
  return { ...state, [action.type]: action.value };
}
