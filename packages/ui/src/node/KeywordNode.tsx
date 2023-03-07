import React, { useContext } from "react";
import { ASTKeyword } from "language-syntax";

import { FocusContainerContext, getTabIndex } from "../focus";
import { NodeProps } from "./Node";

import "./PrimitiveNode.css";

export const KeywordNode = ({ node, path }: NodeProps<ASTKeyword>) => {
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
