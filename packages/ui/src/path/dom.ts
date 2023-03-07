import { fromJS, List } from "immutable";

export function getElementFromPath(path: List<number>): HTMLElement | null {
  return document.querySelector<HTMLElement>(
    `[data-path="${JSON.stringify(path)}"]`
  );
}

export function getFocusedElementWithPath() {
  const element = document.activeElement as HTMLElement | null;

  if (element === null) {
    return;
  }

  const path = getPathFromElementData(element);

  if (path === undefined) {
    return;
  }

  return { element, path };
}

export function getPathFromElementData(
  element: HTMLElement
): List<number> | undefined {
  const containerPathAttr = element.getAttribute("data-path");

  if (containerPathAttr === null) {
    return;
  }

  const pathArray: Array<number> = JSON.parse(containerPathAttr);
  return fromJS(pathArray);
}

export function getNthChildPath(path: List<number>, n: number): List<number> {
  return path.push(n);
}

export const getNthChildElement = (path: List<number>, n: number) =>
  getElementFromPath(getNthChildPath(path, n));

export function getNthSiblingPath(
  path: List<number>,
  n: number
): List<number> | undefined {
  if (path.size === 0) {
    return undefined;
  }

  return path.set(path.size - 1, n);
}

export function getNthSiblingElement(
  path: List<number>,
  n: number
): HTMLElement | null {
  const nthSiblingPath = getNthSiblingPath(path, n);

  if (nthSiblingPath === undefined) {
    return null;
  }

  return getElementFromPath(nthSiblingPath);
}

export function getLeftSiblingPath(
  path: List<number>
): List<number> | undefined {
  const last = path.last();

  if (last === undefined || last === 0) {
    return;
  }

  return getNthSiblingPath(path, last - 1);
}

export function getLeftSiblingElement(path: List<number>): HTMLElement | null {
  const leftSiblingPath = getLeftSiblingPath(path);

  if (leftSiblingPath === undefined) {
    return null;
  }

  return getElementFromPath(leftSiblingPath);
}

export function getRightSiblingPath(
  path: List<number>
): List<number> | undefined {
  const last = path.last();

  if (last === undefined) {
    return;
  }

  return getNthSiblingPath(path, last + 1);
}

export function getRightSiblingElement(path: List<number>): HTMLElement | null {
  const rightSiblingPath = getRightSiblingPath(path);

  if (rightSiblingPath === undefined) {
    return null;
  }

  return getElementFromPath(rightSiblingPath);
}
