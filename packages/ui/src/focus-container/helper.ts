import classNames from "classnames";
import { List } from "immutable";

import { FocusContainerContextProps } from "./context";

/* the inputPath is focusable (has a tabIndex of 0) if it is
 * a direct child of the containerPath, meaning their paths share
 * all but the last element.
 */
export function getTabIndex(
  inputPath: List<number>,
  { path }: FocusContainerContextProps
): 0 | undefined {
  if (path.equals(inputPath.butLast())) {
    return 0;
  }
}

export function getFocusContainerClass(
  inputPath: List<number>,
  { path }: FocusContainerContextProps
): string {
  const isFocusContainer = inputPath.equals(path);
  return classNames(
    { "container-outline-unfocused": !isFocusContainer },
    { "container-outline-focused": isFocusContainer }
  );
}
