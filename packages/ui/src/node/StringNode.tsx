import React, { useContext } from "react";
import { ASTString } from "language-syntax";

import { FocusContainerContext, getTabIndex } from "../focus-container";
import { NodeProps } from "./Node";

import "./PrimitiveNode.css";

export const StringNode = ({ node, path }: NodeProps<ASTString>) => {
  const focusContainerContext = useContext(FocusContainerContext);

  return (
    <div
      data-path={JSON.stringify(path)}
      tabIndex={getTabIndex(path, focusContainerContext)}
      className="padded-node"
    >
      {node.value}
    </div>
  );
};
