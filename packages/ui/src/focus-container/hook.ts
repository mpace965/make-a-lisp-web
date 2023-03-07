import { useEffect, useState } from "react";

import { defaultContext, FocusContainerState } from "./context";
import {
  getElementFromPath,
  getFocusedElementWithPath,
  getNthChildElement,
} from "../path";

/*
 * Container refers to the element being outlined in black.
 * When a container is outlined, its children elements are included
 * in the tab order, which means they can be focused.
 *
 * useFocus allows a user to select a new container element by navigating
 * up or down. When the new container is active, only its children will
 * be in the tab order.
 *
 * navigating up means a user wants to browse the siblings of the current container
 * navigating down means a user wants to browse the children of the focused element
 *    (making it the new container)
 */
export function useFocusContainer(
  _initialState: Partial<FocusContainerState> = {}
): FocusContainerState {
  const initialState: FocusContainerState = {
    ...defaultContext,
    ..._initialState,
  };
  const [focusContainerContext, setFocusContainerContext] =
    useState<FocusContainerState>(initialState);

  const focusOnContainer = ({ key }: KeyboardEvent) => {
    const newContainer = (() => {
      // navigate down
      if (key === "ArrowDown") {
        const result = getFocusedElementWithPath();

        if (result === undefined) {
          return;
        }

        const { path } = result;

        return {
          path,
          direction: "down" as const,
        };
      }

      // navigate up
      if (key === "ArrowUp") {
        const parentPath = focusContainerContext.path.butLast();

        return {
          path: parentPath,
          direction: "up" as const,
        };
      }
    })();

    if (newContainer === undefined) {
      return;
    }

    const childElement = getNthChildElement(newContainer.path, 0);

    if (childElement === null) {
      return;
    }

    setFocusContainerContext({
      path: newContainer.path,
      previousPath: focusContainerContext.path,
      previousNavigationDirection: newContainer.direction,
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", focusOnContainer);

    return () => {
      window.removeEventListener("keydown", focusOnContainer);
    };
  }, [focusOnContainer]);

  useEffect(() => {
    const {
      path: containerPath,
      previousPath: previousContainerPath,
      previousNavigationDirection,
    } = focusContainerContext;

    if (
      previousContainerPath === undefined ||
      previousNavigationDirection === "down"
    ) {
      getNthChildElement(containerPath, 0)?.focus();
      return;
    }

    if (previousNavigationDirection === "up") {
      getElementFromPath(previousContainerPath)?.focus();
      return;
    }
  }, [focusContainerContext]);

  return focusContainerContext;
}
