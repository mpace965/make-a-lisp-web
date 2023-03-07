import React, { useContext } from "react";
import { ASTHashMap } from "language-syntax";
import classNames from "classnames";

import {
  FocusContainerContext,
  getFocusContainerClass,
  getTabIndex,
} from "../focus";
import { Node, NodeProps } from "./Node";

import "./HashMapNode.css";
import "../focus/style.css";

export const HashMapNode = ({ node, path }: NodeProps<ASTHashMap>) => {
  const focusContainerContext = useContext(FocusContainerContext);
  const hashMapClass = classNames(
    "padded-container",
    "two-column-entries",
    getFocusContainerClass(path, focusContainerContext)
  );

  return (
    <div
      data-path={JSON.stringify(path)}
      tabIndex={getTabIndex(path, focusContainerContext)}
      className={hashMapClass}
    >
      {node.value.entrySeq().map(([key, value], kvIndex) => (
        <React.Fragment key={kvIndex}>
          <Node node={key} path={path.push(2 * kvIndex)} />
          <Node node={value} path={path.push(2 * kvIndex + 1)} />
        </React.Fragment>
      ))}
    </div>
  );
};
