import React, { useContext } from "react";
import { ASTNil } from "language-syntax";

import { FocusContainerContext, getTabIndex } from "../focus";
import { NodeProps } from "./Node";

import "./PrimitiveNode.css";

export const NilNode = ({ path }: NodeProps<ASTNil>) => {
  const focusContainerContext = useContext(FocusContainerContext);

  return (
    <div
      data-path={JSON.stringify(path)}
      tabIndex={getTabIndex(path, focusContainerContext)}
      className="padded-node"
    >
      nil
    </div>
  );
};
