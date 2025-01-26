import { Colors } from "./Components/Contants";
import { IWHSimResults } from "./Simulation";

export type SavedGraph = IWHSimResults & { id: number; color: string };

interface SaveAction {
  type: "save";
  payload: IWHSimResults;
}

interface DeleteAction {
  type: "delete";
  payload: number;
}

type ActionTypes = SaveAction | DeleteAction;

export function GraphsSavingReducer(state: SavedGraph[], action: ActionTypes): SavedGraph[] {
  //
  //
  switch (action.type) {
    case "save": {
      const UnusedColors = Colors.filter((color) => !state.some((graph) => graph.color === color));
      if (UnusedColors.length === 0) return state;

      return [
        ...state,
        {
          ...action.payload,
          id: state.length == 0 ? 1 : state.last().id + 1,
          color: UnusedColors[0],
        },
      ];
    }
    case "delete": {
      return state.filter((graph) => graph.id !== action.payload);
    }
    default:
      return state;
  }
}
