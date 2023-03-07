import React, { useContext } from "react";
import classNames from "classnames";
import { ASTList } from "language-syntax";

import {
  FocusContainerContext,
  getTabIndex,
  getFocusContainerClass,
} from "../focus";
import { Node, NodeProps } from "./Node";

import "./ListNode.css";
import "../focus/style.css";

export const ListNode = ({ node, path }: NodeProps<ASTList>) => {
  const focusContainerContext = useContext(FocusContainerContext);
  const listClass = classNames(
    "elements-in-row",
    getFocusContainerClass(path, focusContainerContext)
  );

  return (
    <div
      data-path={JSON.stringify(path)}
      tabIndex={getTabIndex(path, focusContainerContext)}
      className={listClass}
    >
      {node.value.map((childNode, key) => (
        <Node key={key} node={childNode} path={path.push(key)} />
      ))}
    </div>
  );
};
