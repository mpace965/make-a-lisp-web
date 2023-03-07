import React, { useContext } from "react";
import { ASTSymbol } from "language-syntax";

import { FocusContainerContext, getTabIndex } from "../focus";
import { NodeProps } from "./Node";

import "./SymbolNode.css";
import "./PrimitiveNode.css";

export const SymbolNode = ({ node, path }: NodeProps<ASTSymbol>) => {
  const focusContainerContext = useContext(FocusContainerContext);

  return (
    <div
      data-path={JSON.stringify(path)}
      tabIndex={getTabIndex(path, focusContainerContext)}
      className="bold padded-node"
    >
      {node.value}
    </div>
  );
};
