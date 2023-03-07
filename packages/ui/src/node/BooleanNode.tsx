import React, { useContext } from "react";
import { ASTBoolean } from "language-syntax";

import { FocusContainerContext, getTabIndex } from "../focus";
import { NodeProps } from "./Node";

import "./PrimitiveNode.css";

export const BooleanNode = ({ node, path }: NodeProps<ASTBoolean>) => {
  const focusContainerContext = useContext(FocusContainerContext);

  return (
    <div
      data-path={JSON.stringify(path)}
      tabIndex={getTabIndex(path, focusContainerContext)}
      className="padded-node"
    >
      {JSON.stringify(node.value)}
    </div>
  );
};
