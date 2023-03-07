import { List } from "immutable";
import React, { useState } from "react";
import { ASTNode, SampleExpression } from "language-syntax";
import { evaluate, Step2Environment } from "language-interpreter";
import classNames from "classnames";

import {
  FocusContainerContext,
  getFocusContainerClass,
  getTabIndex,
  useFocusContainer,
} from "./focus-container";
import { Node } from "./node/Node";
import { EditorModeContext, useEditorMode } from "./editor";

import "./App.css";
import "./focus-container/style.css";

const ROOT_PATH: List<number> = List();
const EXPRESSION_PATH = ROOT_PATH.push(0);
const EVALUATED_PATH = ROOT_PATH.push(1);

const { environment } = Step2Environment;
const { expression3 } = SampleExpression;

export function App() {
  const [node, setNode] = useState(expression3);
  const focusContainerContext = useFocusContainer();
  const editorModeContext = useEditorMode();

  const rootClass = classNames(
    "app-font",
    "adjacent-panels",
    getFocusContainerClass(ROOT_PATH, focusContainerContext)
  );
  const expressionPanelClass = classNames(
    "half-panel",
    getFocusContainerClass(EXPRESSION_PATH, focusContainerContext)
  );
  const evaluatedPanelClass = classNames(
    "half-panel",
    getFocusContainerClass(EVALUATED_PATH, focusContainerContext)
  );

  return (
    <FocusContainerContext.Provider value={focusContainerContext}>
      <EditorModeContext.Provider value={editorModeContext}>
        <div data-path={JSON.stringify(ROOT_PATH)} className={rootClass}>
          <div
            data-path={JSON.stringify(EXPRESSION_PATH)}
            tabIndex={getTabIndex(EXPRESSION_PATH, focusContainerContext)}
            className={expressionPanelClass}
          >
            <h1>Expression</h1>
            <Node node={node} path={EXPRESSION_PATH.push(0)} />
          </div>
          <div
            data-path={JSON.stringify(EVALUATED_PATH)}
            tabIndex={getTabIndex(EVALUATED_PATH, focusContainerContext)}
            className={evaluatedPanelClass}
          >
            <h1>Evaluated</h1>
            <Node
              node={evaluate(node, environment) as ASTNode}
              path={EVALUATED_PATH.push(0)}
            />
          </div>
        </div>
      </EditorModeContext.Provider>
    </FocusContainerContext.Provider>
  );
}
