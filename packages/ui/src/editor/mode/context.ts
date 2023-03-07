import { createContext } from "react";
import { List } from "immutable";

export type EditorMode = NotEditingMode | EditingTypeMode | EditingValueMode;

export const defaultContext: EditorMode = { name: "not editing" };

export const EditorModeContext = createContext<EditorMode>(defaultContext);

interface NotEditingMode {
  name: "not editing";
}

interface EditingTypeMode {
  name: "editing type";
  path: List<number>;
}

interface EditingValueMode {
  name: "editing value";
  path: List<number>;
}
