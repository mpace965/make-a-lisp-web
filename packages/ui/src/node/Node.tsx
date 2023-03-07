import React from "react";
import { List } from "immutable";
import {
  ASTBoolean,
  ASTHashMap,
  ASTKeyword,
  ASTList,
  ASTNil,
  ASTNode,
  ASTNumber,
  ASTString,
  ASTSymbol,
  ASTVector,
} from "language-syntax";

import { BooleanNode } from "./BooleanNode";
import { HashMapNode } from "./HashMapNode";
import { KeywordNode } from "./KeywordNode";
import { ListNode } from "./ListNode";
import { NilNode } from "./NilNode";
import { NumberNode } from "./NumberNode";
import { StringNode } from "./StringNode";
import { SymbolNode } from "./SymbolNode";
import { VectorNode } from "./VectorNode";

export interface NodeProps<TASTNode extends ASTNode> {
  node: TASTNode;
  path: List<number>;
}

export const Node = (props: NodeProps<ASTNode>) => {
  if (isNodeProps<ASTBoolean>(props, "boolean")) {
    return <BooleanNode {...props} />;
  }

  if (isNodeProps<ASTHashMap>(props, "hash-map")) {
    return <HashMapNode {...props} />;
  }

  if (isNodeProps<ASTKeyword>(props, "keyword")) {
    return <KeywordNode {...props} />;
  }

  if (isNodeProps<ASTList>(props, "list")) {
    return <ListNode {...props} />;
  }

  if (isNodeProps<ASTNil>(props, "nil")) {
    return <NilNode {...props} />;
  }

  if (isNodeProps<ASTNumber>(props, "number")) {
    return <NumberNode {...props} />;
  }

  if (isNodeProps<ASTString>(props, "string")) {
    return <StringNode {...props} />;
  }

  if (isNodeProps<ASTSymbol>(props, "symbol")) {
    return <SymbolNode {...props} />;
  }

  if (isNodeProps<ASTVector>(props, "vector")) {
    return <VectorNode {...props} />;
  }

  // @ts-expect-error
  return <div>Unsupported node type "{node.name}".</div>;
};

function isNodeProps<TASTNode extends ASTNode>(
  props: NodeProps<ASTNode>,
  name: TASTNode["name"]
): props is NodeProps<TASTNode> {
  return props.node.name === name;
}
