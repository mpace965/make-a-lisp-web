import React from "react";
import { List } from "immutable";

export interface FocusContainerContextProps {
  path: List<number>;
  previousPath?: List<number>;

  // the navigation direction that resulted in the current value of containerPath
  previousNavigationDirection?: NavigationDirection;
}

export const defaultContext: FocusContainerContextProps = {
  path: List(),
};

export const FocusContainerContext =
  React.createContext<FocusContainerContextProps>(defaultContext);

export type NavigationDirection = "up" | "down";
