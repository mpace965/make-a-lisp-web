import { useEffect, useState } from "react";

import { getFocusedElementWithPath } from "../../path";
import { defaultContext, EditorMode } from "./context";

export function useEditorMode(): EditorMode {
  const [editorMode, setEditorMode] = useState<EditorMode>(defaultContext);

  const handleEditorModeCommand = ({ key }: KeyboardEvent) => {
    if (editorMode.name === "not editing") {
      if (key === "e") {
        const { path } = getFocusedElementWithPath() || {};

        if (path === undefined) {
          // TODO: error handling
          return;
        }

        setEditorMode({ name: "editing value", path });
        return;
      }

      if (key === "t") {
        const { path } = getFocusedElementWithPath() || {};

        if (path === undefined) {
          // TODO: error handling
          return;
        }

        setEditorMode({ name: "editing type", path });
        return;
      }
    }

    if (editorMode.name === "editing value") {
      if (key === "Enter") {
        setEditorMode({ name: "not editing" });
        return;
      }
    }

    if (editorMode.name === "editing type") {
      if (key === "Enter") {
        setEditorMode({ name: "not editing" });
        return;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleEditorModeCommand);

    return () => {
      window.removeEventListener("keydown", handleEditorModeCommand);
    };
  }, [handleEditorModeCommand]);

  return editorMode;
}
