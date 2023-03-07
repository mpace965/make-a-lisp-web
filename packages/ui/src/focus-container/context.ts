import { createContext } from "react";
import { List } from "immutable";

export interface FocusContainerState {
  path: List<number>;
  previousPath?: List<number>;

  // the navigation direction that resulted in the current value of containerPath
  previousNavigationDirection?: NavigationDirection;
}

export const defaultContext: FocusContainerState = {
  path: List(),
};

export const FocusContainerContext =
  createContext<FocusContainerState>(defaultContext);

export type NavigationDirection = "up" | "down";
