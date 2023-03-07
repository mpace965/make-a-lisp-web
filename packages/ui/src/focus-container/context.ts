import { createContext } from "react";
import { List } from "immutable";

export interface FocusContainer {
  path: List<number>;
  previousContainer?: {
    path: List<number>;

    // the navigation direction that resulted in top-level value of path
    navigationDirection: NavigationDirection;
  };
}

export const defaultContext: FocusContainer = {
  path: List(),
};

export const FocusContainerContext =
  createContext<FocusContainer>(defaultContext);

export type NavigationDirection = "up" | "down";
