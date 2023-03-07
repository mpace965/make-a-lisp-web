import React, { useContext } from "react";
import { ASTVector } from "language-syntax";
import classNames from "classnames";

import {
  FocusContainerContext,
  getFocusContainerClass,
  getTabIndex,
} from "../focus";
import { Node, NodeProps } from "./Node";

import "./VectorNode.css";
import "../focus/style.css";

export const VectorNode = ({ node, path }: NodeProps<ASTVector>) => {
  const focusContainerContext = useContext(FocusContainerContext);
  const vectorClass = classNames(
    "elements-in-row",
    getFocusContainerClass(path, focusContainerContext)
  );

  return (
    <div
      data-path={JSON.stringify(path)}
      tabIndex={getTabIndex(path, focusContainerContext)}
      className={vectorClass}
    >
      {node.value.map((childNode, key) => (
        <Node key={key} node={childNode} path={path.push(key)} />
      ))}
    </div>
  );
};
